angular.module('HRMBudget').factory('postService',function(
    $http
) {

    var postService = {
        model:{
            item:null,
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/posts')
                .then(function(res){

                    var list = res.data;
                    postService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        },
        getOne:function(id, cb){

            return $http.get('/api/post/'+id)
                .then(function(res){

                    var item = res.data;
                    postService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        create:function(data, cb){

            return $http.post('/api/post', data)
                .then(function(res){

                    var item = res.data;
                    postService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        update:function(id, data, cb){

            return $http.put('/api/post/'+id, data)
                .then(function(res){

                    postService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });
        },
        remove:function(id, cb){

            return $http.delete('/api/post/'+id)
                .then(function(res){

                    postService.model.item = null;

                    if(cb){
                        cb(res);
                    }

                });
        }
    };

    return postService;
});
