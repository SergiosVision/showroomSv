import * as firebase from 'firebase'
import { config } from './keys'

firebase.initializeApp(config)

export const db = () => {
    let data = firebase.firestore()

    data.settings({timestampsInSnapshots: true})

    return data
}

export const collection = (collectionName) => db().collection(collectionName)

export const getData = (collectionName) => {
    let dataArray = []

    return collection(collectionName).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            dataArray.push({...doc.data(), id: doc.id})
        })

        return dataArray
    })
}