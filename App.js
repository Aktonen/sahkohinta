import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import moment from 'moment-timezone';

const ELECTRICITY_PRICE_ENDPOINT = 'https://api.porssisahko.net/v1/latest-prices.json';

const EXAMPLE_DATA =
{
  'prices':
    [
      {
        'price': 0.956,
        'startDate': '2024-05-31T21:00:00.000Z',
        'endDate': '2024-05-31T22:00:00.000Z',
      },
      {
        'price': 1.544,
        'startDate': '2024-05-31T20:00:00.000Z'
        , 'endDate': '2024-05-31T21:00:00.000Z',
      },
      {
        'price': 2.259,
        'startDate': '2024-05-31T19:00:00.000Z',
        'endDate': '2024-05-31T20:00:00.000Z',
      },
      {
        'price': 2.305,
        'startDate': '2024-05-31T18:00:00.000Z',
        'endDate': '2024-05-31T19:00:00.000Z',
      },
      {
        'price': 12.208,
        'startDate': '2024-05-31T17:00:00.000Z',
        'endDate': '2024-05-31T18:00:00.000Z',
      },
      {
        'price': 12.954,
        'startDate': '2024-05-31T16:00:00.000Z',
        'endDate': '2024-05-31T17:00:00.000Z',
      },
      {
        'price': 10.003,
        'startDate': '2024-05-31T15:00:00.000Z',
        'endDate': '2024-05-31T16:00:00.000Z',
      },
      {
        'price': 8.926,
        'startDate': '2024-05-31T14:00:00.000Z',
        'endDate': '2024-05-31T15:00:00.000Z',
      },
      {
        'price': 8.354,
        'startDate': '2024-05-31T13:00:00.000Z',
        'endDate': '2024-05-31T14:00:00.000Z',
      },
      {
        'price': 8.162,
        'startDate': '2024-05-31T12:00:00.000Z',
        'endDate': '2024-05-31T13:00:00.000Z',
      },
      {
        'price': 8.57,
        'startDate': '2024-05-31T11:00:00.000Z',
        'endDate': '2024-05-31T12:00:00.000Z',
      },
      {
        'price': 9.355,
        'startDate': '2024-05-31T10:00:00.000Z',
        'endDate': '2024-05-31T11:00:00.000Z',
      },
      {
        'price': 10.23,
        'startDate': '2024-05-31T09:00:00.000Z',
        'endDate': '2024-05-31T10:00:00.000Z',
      },
      {
        'price': 11.196,
        'startDate': '2024-05-31T08:00:00.000Z',
        'endDate': '2024-05-31T09:00:00.000Z',
      },
      {
        'price': 12.546,
        'startDate': '2024-05-31T07:00:00.000Z',
        'endDate': '2024-05-31T08:00:00.000Z',
      },
      {
        'price': 13.599,
        'startDate': '2024-05-31T06:00:00.000Z',
        'endDate': '2024-05-31T07:00:00.000Z',
      },
      {
        'price': 15.245,
        'startDate': '2024-05-31T05:00:00.000Z',
        'endDate': '2024-05-31T06:00:00.000Z',
      },
      {
        'price': 10.71,
        'startDate': '2024-05-31T04:00:00.000Z',
        'endDate': '2024-05-31T05:00:00.000Z',
      },
      {
        'price': 1.678,
        'startDate': '2024-05-31T03:00:00.000Z',
        'endDate': '2024-05-31T04:00:00.000Z',
      },
      {
        'price': 1.133,
        'startDate': '2024-05-31T02:00:00.000Z',
        'endDate': '2024-05-31T03:00:00.000Z',
      },
      {
        'price': 0.892,
        'startDate': '2024-05-31T01:00:00.000Z',
        'endDate': '2024-05-31T02:00:00.000Z',
      },
      {
        'price': 0.883,
        'startDate': '2024-05-31T00:00:00.000Z',
        'endDate': '2024-05-31T01:00:00.000Z',
      },
      {
        'price': 0.849,
        'startDate': '2024-05-30T23:00:00.000Z',
        'endDate': '2024-05-31T00:00:00.000Z',
      },
      {
        'price': 0.882,
        'startDate': '2024-05-30T22:00:00.000Z',
        'endDate': '2024-05-30T23:00:00.000Z',
      },
      {
        'price': 0.748,
        'startDate': '2024-05-30T21:00:00.000Z',
        'endDate': '2024-05-30T22:00:00.000Z',
      },
      {
        'price': 1.855,
        'startDate': '2024-05-30T20:00:00.000Z',
        'endDate': '2024-05-30T21:00:00.000Z',
      },
      {
        'price': 5.291,
        'startDate': '2024-05-30T19:00:00.000Z',
        'endDate': '2024-05-30T20:00:00.000Z',
      },
      {
        'price': 7.558,
        'startDate': '2024-05-30T18:00:00.000Z',
        'endDate': '2024-05-30T19:00:00.000Z',
      },
      {
        'price': 21.459,
        'startDate': '2024-05-30T17:00:00.000Z',
        'endDate': '2024-05-30T18:00:00.000Z',
      },
      {
        'price': 30.99,
        'startDate': '2024-05-30T16:00:00.000Z',
        'endDate': '2024-05-30T17:00:00.000Z',
      },
      {
        'price': 24.226,
        'startDate': '2024-05-30T15:00:00.000Z',
        'endDate': '2024-05-30T16:00:00.000Z',
      },
      {
        'price': 22.248,
        'startDate': '2024-05-30T14:00:00.000Z',
        'endDate': '2024-05-30T15:00:00.000Z',
      },
      {
        'price': 17.934,
        'startDate': '2024-05-30T13:00:00.000Z',
        'endDate': '2024-05-30T14:00:00.000Z',
      },
      {
        'price': 24.805,
        'startDate': '2024-05-30T12:00:00.000Z',
        'endDate': '2024-05-30T13:00:00.000Z',
      },
      {
        'price': 17.501,
        'startDate': '2024-05-30T11:00:00.000Z',
        'endDate': '2024-05-30T12:00:00.000Z',
      },
      {
        'price': 13.629,
        'startDate': '2024-05-30T10:00:00.000Z',
        'endDate': '2024-05-30T11:00:00.000Z',
      },
      {
        'price': 12.4,
        'startDate': '2024-05-30T09:00:00.000Z',
        'endDate': '2024-05-30T10:00:00.000Z',
      },
      {
        'price': 17.607,
        'startDate': '2024-05-30T08:00:00.000Z',
        'endDate': '2024-05-30T09:00:00.000Z',
      },
      {
        'price': 17.607,
        'startDate': '2024-05-30T07:00:00.000Z',
        'endDate': '2024-05-30T08:00:00.000Z',
      },
      {
        'price': 13.211,
        'startDate': '2024-05-30T06:00:00.000Z',
        'endDate': '2024-05-30T07:00:00.000Z',
      },
      {
        'price': 17.608, 'startDate': '2024-05-30T05:00:00.000Z',
        'endDate': '2024-05-30T06:00:00.000Z',
      },
      {
        'price': 7.444,
        'startDate': '2024-05-30T04:00:00.000Z',
        'endDate': '2024-05-30T05:00:00.000Z',
      },
      {
        'price': 0.646,
        'startDate': '2024-05-30T03:00:00.000Z',
        'endDate': '2024-05-30T04:00:00.000Z',
      },
      {
        'price': 0.334,
        'startDate': '2024-05-30T02:00:00.000Z',
        'endDate': '2024-05-30T03:00:00.000Z',
      },
      {
        'price': 0.224,
        'startDate': '2024-05-30T01:00:00.000Z',
        'endDate': '2024-05-30T02:00:00.000Z',
      },
      {
        'price': 0.155,
        'startDate': '2024-05-30T00:00:00.000Z',
        'endDate': '2024-05-30T01:00:00.000Z',
      },
      {
        'price': 0.134,
        'startDate': '2024-05-29T23:00:00.000Z',
        'endDate': '2024-05-30T00:00:00.000Z',
      },
      {
        'price': 0.226,
        'startDate': '2024-05-29T22:00:00.000Z',
        'endDate': '2024-05-29T23:00:00.000Z',
      },
    ],
};

const FULL_WIDTH = Dimensions.get('window').width; //full width

export default function App() {
  const [datePrices, setDatePrices] = useState(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(ELECTRICITY_PRICE_ENDPOINT)
      .then(response => response.json())
      .then(data => {
        const newDatePrices = new Map();

        data.prices.forEach((item) => {
          const day = moment(item.startDate).tz('Europe/Helsinki').format('DD.MM.');
          if (!newDatePrices.has(day)) {
            newDatePrices.set(day, []);
          }
          newDatePrices.get(day).push(item);
        });

        setDatePrices(newDatePrices);
        setLoading(false);
      })
      .catch(error => console.error('There was an error fetching the electricity prices:', error));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {Array.from(datePrices).map(([day, prices], index) => (
          <View key={index}>
            <View style={styles.dayTitleWrapper}>
              <Text style={styles.dateHeader}>Päivä: {day}</Text>
            </View>
            <View style={styles.pricesWrapper}>
              {prices.map((priceData, index) => (
                <View key={index} style={styles.itemWrapper}>
                  <Text key={index} style={styles.item}>
                    {moment(priceData.startDate).tz('Europe/Helsinki').format('HH')} - {moment(priceData.endDate).tz('Europe/Helsinki').format('HH')} Hinta: {priceData.price} snt/kWh
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    paddingTop: 10,
  },

  item: {
    fontSize: 18,
    margin: 10,
    color: 'white',
  },

  itemWrapper: {
    borderRadius: 10,
    margin: 5,
    width: FULL_WIDTH - 20,
    backgroundColor: 'black',
  },

  pricesWrapper: {
    backgroundColor: 'grey',
    borderRadius: 10,
    margin: 5,
    width: FULL_WIDTH - 10,
  },

  dateHeader: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },

  dayTitleWrapper: {
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
    margin: 5,
    width: FULL_WIDTH - 10,
  },
});
