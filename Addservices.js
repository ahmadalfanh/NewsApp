import {app} from '../config/db'

export const addItem = (title, image, desc, date) =>{
    app.database().ref('/news/').push({
        title:title,
        image:image,
        desc:desc,    
        date:date
    })
}

