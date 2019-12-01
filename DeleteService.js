import {app} from '../config/db';
//DELETE DATA DI DATABSE
export const deleteItem = (title)=>{
    var query = app.database().ref('/news').orderByChild('title').equalTo(title);
    query.once("value",function(snapshot){
        snapshot.forEach(function(child){
            child.ref.remove();
        })
    })
}