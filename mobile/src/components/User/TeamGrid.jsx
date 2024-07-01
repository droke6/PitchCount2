import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ACCESS_TOKEN, LAST_NAME } from '../../utils/constants';
import { refreshAccessToken } from '../../utils/tokenUtils';

const TeamGrid = ({ teams }) => {
  const navigation = useNavigation();
  const [teamList, setTeamList] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: '',
    grade: '',
    league: ''
  });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedLastName = await AsyncStorage.getItem(LAST_NAME);
        if (storedLastName) {
          setUserData(prevUserData => ({
            ...prevUserData,
            lastName: storedLastName
          }));
        }

        // Retrieve first name from AsyncStorage or API
        // Example: const storedFirstName = await AsyncStorage.getItem(FIRST_NAME);
        const storedFirstName = "John"; // Replace with actual retrieval logic

        setUserData(prevUserData => ({
          ...prevUserData,
          firstName: storedFirstName
        }));
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    const loadTeams = async () => {
      try {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (token) {
          fetchTeams(token);
        } else {
          navigation.navigate('Login'); // Navigate to sign-in screen if token is not available
        }
      } catch (error) {
        console.error('Error loading token:', error);
      }
    };

    loadUserData();
    loadTeams();
  }, [navigation]);

  const fetchTeams = async (token) => {
    try {
      const response = await fetch('http://100.110.160.138:8000/api/teams/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            fetchTeams(newToken);
            return;
          } else {
            navigation.navigate('Login'); // Navigate to sign-in screen if token refresh fails
          }
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeamList(data);
    } catch (error) {
      console.error('Error fetching teams:', error.message);
    }
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        navigation.navigate('Login'); // Navigate to sign-in screen if token is not available
        return;
      }

      const { name, grade, league } = newTeam;

      // Construct the payload to send to the backend
      const payload = {
        name,
        grade,
        league,
        coach_first_name: userData.firstName, // Using logged-in user's first name
        coach_last_name: userData.lastName    // Using logged-in user's last name
      };

      const response = await fetch('http://100.110.160.138:8000/api/teams/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeamList([...teamList, data]);
      setNewTeam({
        name: '',
        grade: '',
        league: ''
      });
      setError(null); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      console.error('Error saving team:', error.message);
    }
  };

  const handleChange = (name, value) => {
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleDelete = async (teamId) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        navigation.navigate('Login'); // Navigate to sign-in screen if token is not available
        return;
      }

      const response = await fetch(`http://100.110.160.138:8000/api/teams/${teamId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTeamList(prevTeamList => prevTeamList.filter(team => team.team_id !== teamId));
    } catch (error) {
      console.error('Error deleting team:', error.message);
    }
  };

  const handleArchive = async (teamId) => {
    try {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        navigation.navigate('Login'); // Navigate to sign-in screen if token is not available
        return;
      }

      const response = await fetch(`http://100.110.160.138:8000/api/archive-team/${teamId}/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTeamList(prevTeamList => prevTeamList.filter(team => team.team_id !== teamId));
      fetchTeams(token);
    } catch (error) {
      console.error('Error archiving team:', error.message);
    }
  };

  // Sort the teamList by grade level in ascending order
  const sortedTeamList = [...teamList].sort((a, b) => a.grade - b.grade);

  return (
    <View style={styles.coachTeamsSection}>
      <View style={[styles.coachTeamsGrid, sortedTeamList.length <= 1 ? styles.oneColumn : styles.twoColumn]}>
        {sortedTeamList.length === 0 ? (
          <View style={styles.noTeams}>
            <Text>You have not added any teams to your account.</Text>
          </View>
        ) : (
          sortedTeamList.map((team, index) => (
            <View key={index} style={styles.teamItem}>
              <Text style={styles.teamTitle} onPress={() => navigation.navigate(`TeamDetails`, { teamId: team.team_id })}>
                <Text>{team.grade}B-{team.name}-{userData.firstName} {userData.lastName}</Text>
              </Text>
              <Text>{team.league}</Text>
              <View style={styles.teamOptions}>
                <Button title="Schedule" onPress={() => navigation.navigate('TeamSchedule', { teamId: team.team_id })} />
                <Button title="Roster" onPress={() => navigation.navigate('TeamRoster', { teamId: team.team_id })} />
                <Button title="Add Pitch Count" onPress={() => navigation.navigate('PitchCount', { teamId: team.team_id })} />
                <Button title="Team Reports" onPress={() => navigation.navigate('TeamReports', { teamId: team.team_id })} />
                <View>
                  <Button title="Archive" onPress={() => handleArchive(team.team_id)} />
                  <Button title="Delete" onPress={() => handleDelete(team.team_id)} />
                </View>
              </View>
            </View>
          ))
        )}
        {/* Additional empty grid item for odd number of teams */}
        {sortedTeamList.length % 2 === 1 && (
          <View style={styles.emptyTeamItem}></View>
        )}
      </View>
      <View style={styles.addTeam}>
        <TextInput
          style={styles.input}
          placeholder="Team Name"
          value={newTeam.name}
          onChangeText={value => handleChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Grade"
          value={newTeam.grade}
          onChangeText={value => handleChange('grade', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="League"
          value={newTeam.league}
          onChangeText={value => handleChange('league', value)}
        />
        <Button
          title="Add New Team"
          onPress={handleSave}
        />
        {error && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
    </View>
  );
};

TeamGrid.propTypes = {
  teams: PropTypes.array
};

const styles = StyleSheet.create({
  coachTeamsSection: {
    flex: 1,
    padding: 10
  },
  coachTeamsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  oneColumn: {
    justifyContent: 'center'
  },
  twoColumn: {
    justifyContent: 'flex-start'
  },
  noTeams: {
    alignItems: 'center'
  },
  teamItem: {
    width: '48%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5
  },
  teamTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  teamOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  addTeam: {
    marginTop: 20
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  errorMessage: {
    color: 'red',
    marginTop: 5
  }
});

export default TeamGrid;
