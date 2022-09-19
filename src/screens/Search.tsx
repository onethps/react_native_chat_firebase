import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import { db } from '../api';
import {
  globalThemeTypes,
  MessagesType,
  SearchProps,
  useAppNavigation,
} from '../types/types';
import { useFocusEffect, useIsFocused, useTheme } from '@react-navigation/native';
import useAutoFocusInput from '../utils/useAutoFocusInput';

const { width, height } = Dimensions.get('screen');
const WIDTH = width;
const HEIGHT = height;

const Search: FC<SearchProps> = ({ route }) => {
  const [value, setValue] = useState<string>('');
  const { allRoomIds, ref_input2 } = route.params;

  const autoFocusProps = useAutoFocusInput();

  const theme: globalThemeTypes = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const nav = useAppNavigation();

  const [findResults, setFindResults] = useState<any[]>([]);

  useEffect(() => {
    setFindResults([]);
    if (allRoomIds) {
      if (value.length >= 2) {
        allRoomIds.forEach(async (id) => {
          const queries = [];
          queries.push(
            getDocs(
              query(
                collection(db, 'chat', id, 'messages'),
                orderBy('message'),
                startAt(value),
                endAt(value + '\uf8ff'),
              ),
            ),
          );

          await Promise.all(queries)
            .then((res) =>
              res.map((qs) => qs.docs).reduce((acc, docs) => [...acc, ...docs]),
            )
            .then((matchingRefs: any) =>
              matchingRefs.forEach((el: any) =>
                setFindResults((prev) => [...prev, { key: el.id, ...el.data() }]),
              ),
            );
        });
      }
    }
  }, [value]);

  useLayoutEffect(() => {
    nav.setOptions({
      title: '',
      headerTransparent: true,
      headerBackVisible: true,
      headerRight: () => (
        // <TouchableOpacity
        //   onPress={() => Alert.alert('sss')}
        //   style={{
        //     width: WIDTH - 80,
        //     justifyContent: 'flex-end',
        //   }}
        // >
        <TextInput
          ref={ref_input2}
          autoFocus={true}
          placeholder={'Search...'}
          onChangeText={setValue}
          value={value}
          style={styles.input}
        />
        // </TouchableOpacity>
      ),
    });
  }, [value]);

  const renderElem = useCallback(({ item }: { item: MessagesType & { key: string } }) => {
    return (
      <View>
        <Text>{item.message}</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!findResults.length ? (
        <View style={styles.noSearchResults}>
          <Text style={styles.noSearchResultsText}>No Search Results...</Text>
        </View>
      ) : (
        <FlatList
          data={findResults}
          renderItem={renderElem}
          keyExtractor={(item) => item.key.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme: globalThemeTypes) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      marginTop: 80,
    },
    input: {
      borderRadius: 10,
      paddingVertical: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      color: theme.colors.text,
      backgroundColor: theme.colors.inputBgLight,
    },
    noSearchResults: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    noSearchResultsText: {
      fontSize: 18,
      opacity: 0.5,
      fontWeight: 'bold',
    },
  });

export default Search;
