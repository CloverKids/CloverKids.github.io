//$(document).ready(function () {

//});

function Input_KeyDown(event) {
    let keyword = $('#keyword').val();
    if (keyword.length >= 6) {
        if (event.keyCode === 13) {
            // let result = result.innerHTML;
            // let result = document.createElement("div");
            // result.setAttribute("id", "result");
            // $('#result').hide();
            document.getElementById("result").innerHTML = "";
            $.post("http://127.0.0.1/api/searchQuestion", {"keyword": keyword}, function (ret) {
                    for (let i = 0; i < ret['data'].length; i++) {
                        let Qs = ret['data'][i].q.split("\n");
                        let As = ret['data'][i].a.split("\n");
                        let questions = '<div id="Q"><ul><span style="color: black;">';
                        let answers = '<div id="A"><ul><span style="color: red;">答案：</span><span style="color: green;">';

                        for (let q = 0; q < Qs.length; q++) {
                            if (q === 0)
                                questions += ("<li>" + Qs[q] + "</li><br/>");
                            else
                                questions += (Qs[q] + "<br/>");
                        }

                        questions += "</span></ul></div>";

                        for (let a = 0; a < As.length; a++) {
                            answers += (As[a] + "<br/>");
                        }
                        answers += "</span></ul></div><br/><br/>";

                        document.getElementById("result").innerHTML += questions + answers;

                        console.log('OK');

                        $('#result').show();

                    }
                    if (typeof (ret.info.c) !== 'undefined')
                        alert(ret.info.c);
                }
            ).fail(function (error) {
                //alert(error);
                let err = $.parseJSON(error.responseText);
                alert(err.msg);
            });
        }
    }
}

