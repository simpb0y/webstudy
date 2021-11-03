$(function () {

    function getData() {
        $.ajax({
            url: 'http://localhost:4000/list',
            type: 'get',
            success: function (data) {
                // console.log(data);
                var result = {
                    data: data
                }
                var html = template("tmplt", result)
                // console.log(html);
                // 将数据结构动态的渲染到页面中去
                $("#tbody").html(html)
            }
        })

    }


    getData()


    //     调用Ajax， 请求接口（ 添加数据），封装Ajax函数 
    function putData(inputDate, inputSubject, inputTime, inputCrystallization) {
        $.ajax({
            url: 'http://localhost:4000/list',
            type: 'post',
            data: {
                date: inputDate,
                subject: inputSubject,
                time: inputTime,
                crystallization: inputCrystallization
            },
            success: function () {
                //  添加完数据之后，要再次重新调用获取数据的函数，来更新
                getData()
            }
        })
    }

    $("#addBtn").on("click", function () {
        // 获取到文本框中的数据 
        var inputDate = $(".add input:eq(0)").val();
        var inputSubject = $(".add input:eq(1)").val();
        var inputTime = $(".add input:eq(2)").val();
        var inputCrystallization = $(".add input:eq(3)").val();

        //     调用封装好的Ajax函数， 把获取到的数据， 通过接口， 存入到db.json中去
        if (inputDate && inputSubject && inputTime && inputCrystallization) {
            putData(inputDate, inputSubject, inputTime, inputCrystallization);
        } else {
            alert("请把数据输入完整");
        }
    });

    //     封装删除 数据的Ajax请求的函数， 来调用删除的接口 -
    function deleteData(id, callback) {
        $.ajax({
            url: 'http://localhost:4000/list/' + id,
            type: 'delete',
            success: function () {
                callback && callback();
            }
        })
    }
    $("#tbody").on("click", ".delete", function () {
        //     通过获取id值， 来判断点击的是哪一行,从删除那一行
        // $(this) 就是你点击的删除按钮元素
        var id = $(this).parent().parent().children('td:first').text();
        // console.log(id);
        var flag = confirm("确认是否删除");
        // console.log(flag)
        if (flag) {
            deleteData(id, function () {
                getData();
            })

        }



    });




})