// import React from "react";
// import { View, Text, Dimensions, StyleSheet } from "react-native";
// import { PieChart } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

// export default function DonutChart({ data }) {
//   const total = data.reduce((sum, item) => sum + item.value, 0);

//   const chartData = data
//     .filter((item) => item.value > 0)
//     .map((item) => ({
//       name: item.label,
//       population: item.value,
//       color: item.color,
//       legendFontColor: "#7F7F7F",
//       legendFontSize: 12,
//     }));

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerRow}>
//         <Text style={styles.title}>Доходи</Text>
//         <Text style={styles.total}>Всього за місяць: {total}</Text>
//       </View>
//       <PieChart
//         data={chartData}
//         width={screenWidth - 40}
//         height={220}
//         chartConfig={{
//           color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
//         }}
//         accessor={"population"}
//         backgroundColor={"transparent"}
//         paddingLeft={"15"}
//         absolute
//         hasLegend={true}
//         center={[0, 0]}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 16,
//     marginVertical: 16,
//     alignItems: "center",
//     elevation: 3,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#000000",
//   },
//   total: {
//     fontSize: 16,
//     color: "#000000",
//     fontWeight: "600",
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//     width: "100%",   
//     paddingHorizontal: 4,
//   },
// });

import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function DonutChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartData = data
    .filter((item) => item.value > 0)
    .map((item) => ({
      name: item.label,
      population: item.value,
      color: item.color,
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    }));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Витрати</Text>
        <Text style={styles.total}>Всього за місяць: {total}</Text>
      </View>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
        hasLegend={true}
        center={[0, 0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  total: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",   
    paddingHorizontal: 4,
  },
});
