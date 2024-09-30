import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  // State management for form inputs and course selection
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [totalFees, setTotalFees] = useState(0);

  // Courses array with id, name, and price
  const courses = [
    { id: 1, name: 'First Aid', price: 1500 },
    { id: 2, name: 'Sewing', price: 1500 },
    { id: 3, name: 'Landscaping', price: 1500 },
    { id: 4, name: 'Life Skills', price: 1500 },
    { id: 5, name: 'Child Minding', price: 750 },
    { id: 6, name: 'Cooking', price: 750 },
    { id: 7, name: 'Garden Maintenance', price: 750 },
  ];

  // Calculate fees based on selected courses, discounts, and VAT
  const calculateFees = () => {
    const total = selectedCourses.reduce((sum, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return sum + (course ? course.price : 0);
    }, 0);

    let discount = 0;
    if (selectedCourses.length === 2) discount = 0.05;
    else if (selectedCourses.length === 3) discount = 0.10;
    else if (selectedCourses.length > 3) discount = 0.15;

    const discountedTotal = total - total * discount;
    const vat = discountedTotal * 0.15;
    const finalTotal = discountedTotal + vat;

    setTotalFees(finalTotal);
  };

  // Handle course selection logic (add/remove)
  const handleCourseSelection = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  // Custom checkbox component
  const CustomCheckbox = ({ isChecked, onPress }: { isChecked: boolean, onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      <View style={[styles.checkboxInner, isChecked && styles.checkboxChecked]} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header with logo and title */}
      <View style={styles.header}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>{'Empowering the Nation'}</Text>
      </View>

      {/* Form with input fields */}
      <View style={styles.form}>
        <Text style={styles.label}>{'Name:'}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={'Enter your name'}
        />

        <Text style={styles.label}>{'Phone Number:'}</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder={'Enter your phone number'}
        />

        <Text style={styles.label}>{'Email:'}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder={'Enter your email'}
        />

        {/* Course selection checkboxes */}
        <Text style={styles.label}>{'Select Courses:'}</Text>
        {courses.map((course) => (
          <View key={course.id} style={styles.checkboxContainer}>
            <CustomCheckbox
              isChecked={selectedCourses.includes(course.id)}
              onPress={() => handleCourseSelection(course.id)}
            />
            <Text>{`${course.name} (R${course.price})`}</Text>
          </View>
        ))}

        {/* Button to calculate total fees */}
        <Button title="Calculate Fees" onPress={calculateFees} />

        {/* Display estimated total */}
        <Text style={styles.total}>{`Estimated Total: R${totalFees.toFixed(2)}`}</Text>
      </View>
    </ScrollView>
  );
}

// Styles for the application
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxInner: {
    height: 12,
    width: 12,
  },
  checkboxChecked: {
    backgroundColor: '#000',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
