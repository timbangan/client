import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {Ionicons, FontAwesome, MaterialCommunityIcons} from 'react-native-vector-icons'
import BlankPage from '../screens/Blank'
import StatsPage from '../screens/StatsPage'
import AchievementModal from '../components/AchievementModal'
const  DashboardNav= createStackNavigator({
  Dashboard: BlankPage
}, {
  initialRouteName: 'Dashboard'
})
const ModalNav = createStackNavigator({
  Achievement: AchievementModal
}, {
    mode: 'modal',
    headerMode: 'none'
})
const ProfileNav = createStackNavigator({
  Stats: StatsPage,
  Achievement: ModalNav
}, {
  initialRouteName: 'Achievement'
})
const  MainNavigator = createBottomTabNavigator({
  Home: DashboardNav,
  Measure: BlankPage,
  Profile: ProfileNav
}, {
  initialRouteName: 'Profile',
  tabBarOptions: {
    activeTintColor: '#2e94b5',
    showLabel: false,
    style: {
      fontHeight: 'bold',
      backgroundColor: '#fff',
    },
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      var IconComponent
      if (routeName === 'Home') {
        IconComponent = FontAwesome;
        iconName = `home`
      } else if (routeName === 'Measure') {
        IconComponent = MaterialCommunityIcons;
        iconName = `scale-bathroom`
      } else if (routeName === 'Profile') {
        var IconComponent = Ionicons;
        iconName = 'ios-contact'
      }
      return <IconComponent name={iconName} size={25} color={tintColor} />
    },
  })
})

export default createAppContainer(MainNavigator);

