import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { viewStyles, textStyles, boxStyles } from '../styles';
import InputScrollView from 'react-native-input-scroll-view';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import TextArea from '../components/TextArea';
import CustomPicker from '../components/CustomPicker';
import API from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const UploadScreen = ({ navigation }) => {

    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [items, setItems] = useState ([
        { label: 'Diary', value: 'diary' },
        { label: 'Todo', value: 'todo' },
        { label: 'Study', value: 'study' },
    ]);

    const getId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('user_id');
            setUserId(user_id);
            console.log('getting id successed' + userId);
        } catch (e) {
            console.error(e);
        }
    }    
    
    useEffect(() => {
        getId();
    }, []);

    const getIndex = (value) => {
        for (let i = 0; i < items.length; i++) { 
            let b = items.findIndex(item => item.value === value);
            setCategoryId(b);
            console.log(value);
            console.log(b);
        }
    }

    const saveNote = async () => {
        const data = {
            user_id: userId,
            title: title,
            date: new Date(),
            contents: contents,
            category_id: categoryId + 1,
        }

        try {
            const response = await API.post(
                `/notes`,
                data
            )
            .then(function (response) {
                if (response.data['success'] == true) {
                    
                    navigation.navigate('Note');
                }
            })
            .catch(function (error) {
                console.log(error.response);
                //console.log(date);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <InputScrollView nestedScrollEnabled = {true}>
            <View style = {boxStyles.top}>
                <Text style = {textStyles.title}>
                    Note
                </Text>
            </View>
            
            <View style = {viewStyles.center}>
                <View style = {{
                    marginTop: 10,
                }}>
                    <View style = {viewStyles.row}>
                        <Text style = {textStyles.text, {
                            margin: 10,
                        }}>
                            Title
                        </Text>
                        <CustomInput
                            value = {title}
                            setValue = {setTitle}
                            placeholder = 'Add a text'
                        />
                    </View>
                </View>
                <View>
                    <Text style = {textStyles.text, {
                        margin: 5,
                    }}>
                        Contents
                    </Text>
                    <TextArea 
                        value = {contents}
                        setValue = {setContents}
                    />
                </View>
                <View>
                    <View style = {viewStyles.row}>
                        <Text style = {textStyles.text, {
                            marginLeft: 0,
                            marginRight: 15,
                            marginTop: 13
                        }}>
                            Category
                        </Text>
                        <CustomPicker
                            open = {open}
                            value = {category}
                            items = {items}
                            setOpen = {setOpen}
                            setValue = {setCategory}
                            setItems = {setItems}
                            onChangeValue = {() => getIndex(category)}
                            placeholder = "Select a category"
                        />
                    </View>
                </View>
                <View style = {{
                    marginTop: 10,
                }}>
                    <CustomButton 
                        onPress = {saveNote}
                        text = "Save"
                    />
                </View>
            </View> 
        </InputScrollView>
    );
}

export default UploadScreen;