import React from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

type Suggestion = {
  place_id: string;
  description: string;
};

type HistoryItem = {
  place_id: string;
  name: string;
  description?: string;
};

type GoogleAutoCompleteProps = {
  query: string;
  suggestions: Suggestion[];
  history: HistoryItem[];
  onSearch: (text: string) => void;
  onSelectSuggestion: (item: Suggestion) => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
};

const GoogleAutoCompleteComponent: React.FC<GoogleAutoCompleteProps> = ({
  query,
  suggestions,
  history,
  onSearch,
  onSelectSuggestion,
  onSelectHistoryItem,
}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search for places"
        style={styles.input}
        value={query}
        onChangeText={onSearch}
      />

      <FlatList
        data={suggestions}
        keyExtractor={(item) => item?.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectSuggestion(item)}>
            <Text style={styles.suggestion}>{item.description}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />

      <Text style={styles.historyTitle}>Search History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item?.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectHistoryItem(item)}>
            <Text style={styles.suggestion}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
    </View>
  );
};

// Use React.memo to avoid unnecessary re-renders
const GoogleAutoComplete = React.memo(GoogleAutoCompleteComponent);

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    maxHeight: height * 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 5,
    borderRadius: 6,
  },
  suggestion: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  list: {
    maxHeight: 100,
  },
});

export default GoogleAutoComplete ;
