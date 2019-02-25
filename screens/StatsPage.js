import React, { Component } from 'react'
import AchievementModal from '../components/AchievementModal'
import FlippedCard from '../components/FlippedCard'
import styles from '../components/styles'
// import ProgressBar from '../components/ProgressBar'
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Animated,
  AsyncStorage
} from 'react-native'
import { Icon} from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import gql from 'graphql-tag'
import { Query} from 'react-apollo'



export default class StatsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: "",
      modalVisible: false
    }
    this.barWidth = new Animated.Value(0)
  }
 
  static navigationOptions = {
    title: 'My Profile',
    headerStyle: {
      backgroundColor: 'rgb(52,94,127)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
  componentWillMount = async () => {
    console.log('xxxxxxxxxxxxxxxxxxxxx')
    await AsyncStorage.setItem('user',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YXJnZXQiOnsid2VpZ2h0Ijo3OSwiZGF0ZSI6IjMtMTItMjAxOSJ9LCJ0aW1iYW5nYW5zIjpbXSwiX2lkIjoiNWM3MTdlNGQwNmVhYzIzNzA0MzhlZjc4IiwibmFtZSI6ImFiZWQiLCJlbWFpbCI6ImFiZWRuZWdvQGdtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJoZWlnaHQiOjE3NywicGFzc3dvcmQiOiIkMmIkMTIkSnM1R1g2WjVTb0tzem53Vm1zeGs0T0xCSlZHTnRDd3lNRWExeVQucHlpdWxBbGQxTnhYWGEiLCJkYXRhIjpbeyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NDgiLCJ2YWx1ZSI6NjEsImNyZWF0ZWRBdCI6IjItNi0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NDkiLCJ2YWx1ZSI6NjIsImNyZWF0ZWRBdCI6IjItNy0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTAiLCJ2YWx1ZSI6NzEsImNyZWF0ZWRBdCI6IjItOC0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTEiLCJ2YWx1ZSI6NzcsImNyZWF0ZWRBdCI6IjItOS0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTIiLCJ2YWx1ZSI6ODEsImNyZWF0ZWRBdCI6IjItMTItMjAxOSJ9LHsiX2lkIjoiNWM3NGFmNGMyZmU3YjM2MDBjZDAzODUzIiwidmFsdWUiOjgwLCJjcmVhdGVkQXQiOiIyLTEzLTIwMTkifSx7Il9pZCI6IjVjNzQwNjhlMmZlN2IzNjAwY2QwMzg1NCIsInZhbHVlIjo2MSwiY3JlYXRlZEF0IjoiMi0xNC0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTUiLCJ2YWx1ZSI6NjIsImNyZWF0ZWRBdCI6IjItMTUtMjAxOSJ9LHsiX2lkIjoiNWM3NDA2OGUyZmU3YjM2MDBjZDAzODU2IiwidmFsdWUiOjcxLCJjcmVhdGVkQXQiOiIyLTE3LTIwMTkifSx7Il9pZCI6IjVjNzQwNjhlMmZlN2IzNjAwY2QwMzg1NyIsInZhbHVlIjo3NywiY3JlYXRlZEF0IjoiMi0xOS0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTgiLCJ2YWx1ZSI6ODEsImNyZWF0ZWRBdCI6IjItMjAtMjAxOSJ9LHsiX2lkIjoiNWM3NGFmNGMyZmU3YjM2MDBjZDAzODU5IiwidmFsdWUiOjgwLCJjcmVhdGVkQXQiOiIyLTI2LTIwMTkifV0sIl9fdiI6MCwiaWF0IjoxNTUxMTk0NjExfQ.6jTVQcV8kjJ43HxZ9CdvghwJ0Ti7b43GfaKGml4cZHY")
    let token = await AsyncStorage.getItem('user')
    this.setState({token})
  }
  componentDidMount() {
    this.animateBar()
  }
  componentDidUpdate() {
    this.animateBar()
  }
  animateBar() {
    this.barWidth.setValue(0)
    Animated.timing(this.barWidth, {
      toValue: 100,
      delay: 800
    }).start()
  }
  renderStats(dataArray) {
    if(dataArray.length === 0 ) return(<Text> No data yet! Start weighing!</Text>)
    let stats = calculateStats (dataArray)
    return (
      <>
   
        <View style={styles.squarebox}><Text style={styles.squareboxText}>{stats.net} KG</Text><Text style={{color: 'white'}}>nett</Text></View>
        <View style={styles.squarebox}><Text style={styles.squareboxText}>{stats.loss} KG</Text><Text style={{color: 'white'}}>loss</Text></View>
        <View style={styles.squarebox}><Text style={styles.squareboxText}>{stats.gain} KG</Text><Text style={{color: 'white'}}>gain</Text></View>
      </>
    )
    function calculateStats(arr) {

      function calculateDailyAvgs(arr) {
        let resultArr = []
        arr.map(datapoint => {
          let index = resultArr.findIndex(r => r.createdAt === datapoint.createdAt)
          if (index > -1) {
            resultArr[index].value = ((resultArr[index].value + datapoint.value) / 2).toFixed(1)
          } else {
            resultArr.push(datapoint)
          }
        })
        return resultArr
      }
      let dailyAvgs = calculateDailyAvgs(arr)
      let lastdiff = 0,
          counter = 0,
          net = 0,
          loss = 0,
          gain = 0
      dailyAvgs.reduce((a, b) => {
        let res
        if (counter === 0) {
          res = b.value - a.value
        } else {
          res = b.value - lastdiff
        }
        lastdiff = b.value
        res > 0 ? gain += res : loss += res
        counter++
        net += res
      })
      return { net, loss, gain }
    }

  }
  render() {
    const GET_USER_DATA = gql`
      query {
        getData(token:"${this.state.token}") {
          data
        }
      }
    `
    return (
        <Query
          query={GET_USER_DATA}
        >
        {({ loading, error, data }) => {
          console.log('halo')
          // let userObj2 = Object(data.getData).data
          // let user = JSON.stringify(userObj2)
          // console.log(user)
          if (loading) return (
            <View>
              <Spinner/>
            </View>
          )
          if (error) return (<Text>Error</Text>)
          if (data.getData.data) {
            let user = JSON.parse(data.getData.data)
            function calculateCurrentWeight(weightData, targetWeight) {
              if (weightData.length === 0) return 'no data yet!'
              else {
                let current =  weightData[weightData.length - 1].value
                return current
              }
            }
            function isSuccess(current, target) {
            
              if (Math.round(current) === Math.round(target)) return true
              else return true
            }
            let height = user.height
            let currentWeight = calculateCurrentWeight(user.data)
            let targetWeight = user.target.weight
            this.state.modalVisible = isSuccess(currentWeight, targetWeight)
            let BMI = ((currentWeight * currentWeight) / (height * height) * 100).toFixed(1)
            
            return (
              <ScrollView contentContainerStyle={styles.main}>
                <AchievementModal visible={this.state.modalVisible} />
                <View style={styles.row} >
                  <TouchableHighlight>
                    <Icon
                      name='accessibility'
                      type='material'
                      size={35}
                      color='red'
                      reverse
                      raised
                      style={styles.iconLeft}
                    />
                  </TouchableHighlight>
                  <View>
                    <Text style={styles.normalText}> {user.name} </Text>
                    <Text style={styles.normalText}> { user.gender.toUpperCase() } </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ ...styles.normalText, marginRight: 4 }}>BMI </Text>
                      <Animated.View style={{ ...styles.bar, width: this.barWidth, alignItems: 'flex-end', paddingRight: 4 }} >
                        <Text style={styles.normalText}> {BMI} </Text>
                      </Animated.View>
                    </View>
                    <Text style={styles.normalText}>{`weight : ${currentWeight} kg`}</Text>
                  </View>
                </View>
                <Text style={styles.headerText}>This Week's Stats</Text>
                <View style={styles.row}>
                  {this.renderStats(user.data)}
                </View>
                <Text style={styles.headerText}>My Target Weight</Text>
                <FlippedCard user={user} />
              </ScrollView>
            )
          }
      }}
        </Query>
    )
  }
}
const styles = {
  bar: {
    height: 23,
    backgroundColor: 'red',
    marginVertical: 4,
    // backgroundImage: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))', 
    opacity:0.9
  },
  main: {
    backgroundColor: '#f1f1f1',
    minHeight: '180%',
    alignItems: 'center'
  },
  iconLeft: {
    paddingHorizontal: 10,
    marginRight: 10
  },
  headerText: {
    fontSize: 25,
    color: 'orange',
    fontWeight: 'bold',
    top: 20,
    opacity: 0.9
  },
  normalText: {
    fontSize: 15,
    color: 'white',
    opacity: 0.9,
    fontWeight: 'bold'
  },
  row: {
    backgroundColor: 'grey',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    top: 30,
    opacity: 1,
    paddingVertical: 10,
    paddingHorizontal:3,
    marginBottom: 15
  },
  segmentedControlIOS: {
    marginVertical: 11,
    width: '90%',
    height: 35,
    opacity: 0.9
  },
  squarebox: {
    width: '30%',
    paddingVertical: 10,
    backgroundColor: 'orange',
    alignItems: 'center',

    marginHorizontal: 5,
    opacity: 0.9,
    borderRadius: 10,
    border: 'solid 3px white'
  },
  squareboxText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
}
