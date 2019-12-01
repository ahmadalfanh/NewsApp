import {app} from '../config/db';
//DELETE DATA DI DATABSE
export const updateItem = (title,image,desc,date)=>{
    var query = app.database().ref('/news').orderByChild('title').equalTo(title);
    query.once("value",function(snapshot){
        snapshot.forEach(function(child){
            child.ref.update({
                title:title,
                image:image,
                desc:desc,
                date:date
            });
        })
    })
}