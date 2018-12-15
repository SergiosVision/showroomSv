import {store} from 'store'

const findIndex = (collection, searchItem) => collection.findIndex(item => item.id === searchItem)

const replaceItem = (collection, index, newItem) => {
    const curArray = collection.slice(0)

    curArray[index] = newItem

    return curArray
}

export const realTime = (querySnapshot, reduxFunc, reduxData) => {
    const collection = store.getState()[reduxData.reducer][reduxData.state]
    console.log(store.dispatch(action => action))
    let output = []
    
    querySnapshot.docChanges().forEach(change => {
        output.push(change.doc.data())
      if (change.type === 'added') {
          console.log(change.doc.data())
        // output.push(change.doc.data())
        // console.log(output)
      } else if (change.type === 'removed') {
        collection.filter(item => {
          if (item.id !== change.doc.data().id) {
            output.push(item)
          } else {
            output = []  
          }
        })
      } else if (change.type === 'modified') {
          const index = findIndex(collection, change.doc.data().id)

          output = replaceItem(collection, index, change.doc.data())
      }
    })

    reduxFunc(output)
  }