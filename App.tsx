import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation';

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
