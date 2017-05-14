/**
 * Created by dashan on 2017/5/3.
 */

var when = require('when');




//最基础的调用
// myquery('11111','22222').then(function(doc){
//     console.log(doc);
// }).catch(function(err){
//     console.log(err);
// })



//when.join
//
// var joinedPromise = when.join(myquery('11111','22222'),myquery('11111','22222'));
// joinedPromise.then(function(doc){
//     console.log(doc);  //两个都成功才执行到这里 eg:[ 911, 1307 ]
// }).catch(function(err){
//     console.log(err);  //两个有一个触发了 reject 那么就会出错 ,并返回err
// })


//when.try 错误的调用方法
// var trypromise = when.try(function(err){
//     // console.log(err);
// },myquery('11111','22222'),myquery('11111','22222'));
//
// trypromise.then(function(doc){
//     console.log(doc);  //两个都成功才执行到这里 eg:[ 911, 1307 ]
// }).catch(function(err){
//     console.log(err);  //两个有一个触发了 reject 那么就会出错 ,并返回err
// })





var sequence = require('when/sequence');

var arrayOfTasks=[];
// arrayOfTasks.push(myquery)
// arrayOfTasks.push(myquery)


var resultsPromise = sequence(arrayOfTasks,myquery('11111','22222'),myquery('11111','22222'));

resultsPromise.done
// console.log(arrayOfTasks[0]);
// console.log(arrayOfTasks[1]);

// resultsPromise.then(f)



















function myquery(sql,parmarr){

    var deferred = when.defer();

    asyncdone1(function(err,doc){
        if(err){
            deferred.reject(err);
        }
        deferred.resolve(doc);
    })

    return deferred.promise;
}




function asyncdone1(callback){
    var random =  Math.floor(Math.random()*2000);
    setTimeout(function(){
        if(random<500){
            return callback("less error!",null);
        }else{
            return callback(null,random);
        }

    },random)
}


