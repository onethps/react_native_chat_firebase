import React, { FC, useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
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
import { SearchProps } from '../types/types';

const Search: FC<SearchProps> = ({ route }) => {
  const [value, setValue] = useState('');
  const { allRoomIds } = route.params;

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

  const renderElem = useCallback(({ item }: { item: any }) => {
    return (
      <View>
        <Text>{item.message}</Text>
      </View>
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TextInput placeholder={'Search...'} onChangeText={setValue} value={value} />
      <FlatList
        data={findResults}
        renderItem={renderElem}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default Search;
