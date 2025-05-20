import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA_KEY = '@O2_TOOL_DATA';

export async function saveData(data: any) {
  await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export async function loadData(): Promise<any | null> {
  const json = await AsyncStorage.getItem(DATA_KEY);
  return json ? JSON.parse(json) : null;
}

export async function clearAll() {
  await AsyncStorage.removeItem(DATA_KEY);
}
