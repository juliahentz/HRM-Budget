angular.module('admin').controller('ContractTypesCtrl',function(
    $scope,
    contractService,
    contractGradeService,
    contractStepService,
    Papa,
    salaryService
){

    $scope.contracts = contractService.model.list;

    $scope.contractModel = {};

    $scope.currentStep = {};
    $scope.currentGrade = {};
    $scope.currentConctract = {};

    $scope.selectedContract = {};
    $scope.selectedGrade = {};

    // todo parse the database data
    $scope.stepList = [];

    for(var i=1; i<8; i++){
        $scope.stepList.push(i);
    }

// 1.
    $scope.createContactType = function(){

        $scope.currentConctract.name = $scope.contractModel.name;

        contractService.create($scope.currentConctract, function(contractData){
            console.log(contractData);
        });
    };


// 3.

    $scope.createGrade = function(){

        $scope.currentGrade.gradeNumber = $scope.contractModel.grade;

        contractGradeService.create($scope.currentGrade, function(gradeData){

            contractService.getOne($scope.selectedContract._id, function(item){

                item.grades.push(gradeData._id);

                contractService.update(item._id, item, function(contractData){
                    console.log(contractData);
                });
            });
        });
    };

// 4. Steps

    $scope.createSteps = function(){

        $scope.currentStep.stepNumber = $scope.contractModel.step;
        $scope.currentStep.basicSalary = $scope.contractModel.basicSalary;

        contractStepService.create($scope.currentStep, function(stepData){

            contractGradeService.getOne($scope.selectedGrade._id, function(item){

                item.steps.push(stepData._id);

                contractGradeService.update(item._id, item, function(gradeData){
                    console.log(gradeData);
                });
            });
        });
    };

    $scope.deleteContactType = function(id){
        contractService.remove(id);
    };

    $scope.importCSV = function(file, errFiles) {

        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {

            Papa.parse(file, {
                header:true,
                dynamicTyping:true,
                complete: function(results) {

                    angular.forEach(results.data, function(data, i){
                        salaryService.create(data, function(salary){
                            console.log(salary);
                        })

                    });

                }
            });

        }
    };
});
