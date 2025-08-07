import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function IncomeChart({ data }) {
  const labels = data.map((item) => item.day.toString());
  const values = data.map((item) => parseFloat(item.amount));

  const total = values.reduce((sum, val) => sum + val, 0).toFixed(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Доходи</Text>
        <Text style={styles.total}>Всього за місяць: {total} </Text>
      </View>
      <BarChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={Dimensions.get("window").width - 32}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        style={styles.chart}
      />
    </View>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  total: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
  },
  chart: {
    borderRadius: 12,
  },
});