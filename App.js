import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

 
  const handleSaveTask = () => {
    if (task.trim()) {
      if (isEditing) {
       
        setTasks(tasks.map(item => (item.id === editTaskId ? { ...item, text: task } : item)));
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        
        setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      }
      setTask('');
    }
  };

 
  const handleEditTask = (id, text) => {
    setIsEditing(true);
    setEditTaskId(id);
    setTask(text);
  };

 
  const deleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title={isEditing ? "Update Task" : "Add Task"} onPress={handleSaveTask} />
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.taskActions}>
              <TouchableOpacity onPress={() => handleEditTask(item.id, item.text)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  taskText: {
    fontSize: 18,
  },
  taskActions: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default App;
