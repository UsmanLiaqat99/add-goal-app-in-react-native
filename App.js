import { useState } from 'react';
import { StyleSheet, View, FlatList, Button, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [goals, setGoals] = useState([])

  function startAddGoalHandler() {
    setIsModalVisible(true)
  }

  function endAddGoalHandler() {
    setIsModalVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setGoals((currentGoals) => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler()
  };

  function deleteGoalHandler(id) {
    setGoals((currentGoals => {
      return currentGoals.filter((goal) => goal.id !== id)
    }))
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal ' color="#5e0acc" onPress={startAddGoalHandler} />
        <GoalInput visible={isModalVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem id={itemData.item.id} text={itemData.item.text} onDeleteItem={deleteGoalHandler} />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 6,
  },

});
