// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useSelector } from 'react-redux';

// function CustomHeader() {
//   const incomes = useSelector((state) => state.income?.incomes ?? []);
//   const expenses = useSelector((state) => state.expense?.expenses ?? []);

//   // Рахуємо загальний баланс = всі доходи - всі витрати
//   const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
//   const totalExpense = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
//   const balance = totalIncome - totalExpense;

//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.leftSection}>
//         <Text style={styles.headerTitle}>Головне</Text>
//       </View>

//       <MaterialCommunityIcons
//         name="safe"
//         size={22}
//         color="white"
//         style={{ marginLeft: 170 }}
//       />

//       <View style={styles.rightSection}>
//         <Text style={styles.balanceLabel}>Баланс:</Text>
//         <Text style={styles.balanceValue}>
//           {balance.toLocaleString('uk-UA')}
//         </Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     width: '100%',
//   },
//   leftSection: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   rightSection: {
//     alignItems: 'flex-end',
//   },
//   balanceLabel: {
//     color: 'white',
//     fontSize: 14,
//     marginRight: 12
//   },
//   balanceValue: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CustomHeader;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function CustomHeader() {
  const incomes = useSelector(state => state.income?.incomes || []);
  const expenses = useSelector(state => state.expense?.expenses || []);

  let totalIncome = 0;
  incomes.forEach(item => {
    totalIncome += Number(item.amount) || 0;
  });

  let totalExpense = 0;
  expenses.forEach(item => {
    totalExpense += Number(item.amount) || 0;
  });

  let balance = totalIncome - totalExpense;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <Text style={styles.headerTitle}>Головне</Text>
      </View>

      <MaterialCommunityIcons
        name="safe"
        size={22}
        color="white"
        style={{ marginLeft: 170 }}
      />

      <View style={styles.rightSection}>
        <Text style={styles.balanceLabel}>Баланс:</Text>
        <Text style={styles.balanceValue}>{balance.toLocaleString('uk-UA')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  balanceLabel: {
    color: 'white',
    fontSize: 14,
    marginRight: 12
  },
  balanceValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
