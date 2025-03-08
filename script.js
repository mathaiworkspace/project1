function getStoredCount(key) {
    return localStorage.getItem(key) || 0;
}

function setStoredCount(key, value) {
    localStorage.setItem(key, value);
}

function loadCandidates(dataKey, containerClass) {
    _.each(data[dataKey], function (element) {
        var count = getStoredCount(element.index + '. ' + element.name);
        var one = `<div class="single-element">
                        <div id="${element.index}" class="name">${element.index}. ${element.name}</div>
                        <div class="number">
                            <span class="minus">-</span>
                            <input disabled type="text" value="${count}"/>
                            <span class="plus">+</span>
                        </div><br>
                    </div>`;
        $(containerClass).append(one);
    });
}

var data = {
    "kaikar": [{
        "name": "Anto D Ollukaran",
        "index": "1",
        "count": "0"
    }, {
        "name": "A.C Chummar",
        "index": "2",
        "count": "0"
    }, {
        "name": "CK Johnson",
        "index": "3",
        "count": "0"
    }, {
        "name": "Joju Varghese",
        "index": "4",
        "count": "0"
    }, {
        "name": "Thimothy Mampliy",
        "index": "5",
        "count": "0"
    },
    {
        "name": "O.L. Wilson",
        "index": "6",
        "count": "0"
    },
    {
        "name": "Invalid Votes",
        "index": "7",
        "count": "0"
    }
    ],
    "Parish": [{
        "name": "Abi Mathew",
        "index": "1",
        "count": "0"
    }, {
        "name": "Abi Ponmanissery",
        "index": "2",
        "count": "0"
    }, {
        "name": "Abi Erinjery",
        "index": "3",
        "count": "0"
    }, {
        "name": "Akhil Francis",
        "index": "4",
        "count": "0"
    }, {
        "name": "Anson George",
        "index": "5",
        "count": "0"
    }, {
        "name": "Anto D Ollukaran",
        "index": "6",
        "count": "0"
    }, {
        "name": "Arooj Mohan",
        "index": "7",
        "count": "0"
    }, {
        "name": "AR Babu",
        "index": "8",
        "count": "0"
    }, {
        "name": "Biju Benjamin",
        "index": "9",
        "count": "0"
    }, {
        "name": "Dolphy Paul",
        "index": "10",
        "count": "0"
    }, {
        "name": "Gleeto Thimothy",
        "index": "11",
        "count": "0"
    }, {
        "name": "Jijo Johnny",
        "index": "12",
        "count": "0"
    }, {
        "name": "CK Johnson",
        "index": "13",
        "count": "0"
    }, {
        "name": "Joju Varghese",
        "index": "14",
        "count": "0"
    }, {
        "name": "Caby Issac",
        "index": "15",
        "count": "0"
    }, {
        "name": "Laz James",
        "index": "16",
        "count": "0"
    }, {
        "name": "Roby Francis",
        "index": "17",
        "count": "0"
    }, {
        "name": "Seena Shaji",
        "index": "18",
        "count": "0"
    }, {
        "name": "Sincy Neo",
        "index": "19",
        "count": "0"
    }, {
        "name": "Sijo Varghese",
        "index": "20",
        "count": "0"
    }, {
        "name": "Tony Parakal",
        "index": "21",
        "count": "0"
    }, {
        "name": "N.R. Varghese",
        "index": "22",
        "count": "0"
    }, {
        "name": "Viju Simon",
        "index": "23",
        "count": "0"
    }, {
        "name": "OL Wilson",
        "index": "24",
        "count": "0"
    }, {
        "name": "Invalid Votes",
        "index": "25",
        "count": "0"
    }]
}

loadCandidates("Parish", ".person");
loadCandidates("kaikar", ".person2");

var totalcount = getStoredCount("totalcount");
$('.total-count').val(totalcount);
if (parseInt(totalcount) > 0) {
    $('.total-count').attr("disabled", true);
}

$(document).ready(function () {
    $('.total-count-btn').click(function () {
        totalcount = parseInt($('.total-count').val());
        $('.total-count').attr("disabled", true);
        setStoredCount("totalcount", totalcount);
    });

    $('.minus, .plus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + ($(this).hasClass('plus') ? 1 : -1);
        count = Math.max(0, count);
        $input.val(count).change();
        setStoredCount($(this).parents(".single-element").find('.name').text(), count);
        return false;
    });

    $('.reset').click(function () {
        localStorage.clear();
        location.reload();
    });

    $('.result1').click(function () {
        if ($('.total-count').val() == "") {
            alert("Enter Total Polled Votes");
        }
        $(".parish-council").html("");
        var array2 = [];
        $('.person .single-element').each(function () {
            var name = $(this).find(".name").text();
            var count = $(this).find("input").val();
            if (count > 0) {
                array2.push({ name: name, count: parseInt(count) });
            }
        });
        array2 = _.sortBy(array2, 'count').reverse();
        displayResults(".parish-council", array2);
    });

    $('.result').click(function () {
        if ($('.total-count').val() == "") {
            alert("Enter Total Polled Votes");
        }
        $(".kaikar").html("");
        var array = [];
        $('.person2 .single-element').each(function () {
            var name = $(this).find(".name").text();
            var count = $(this).find("input").val();
            if (count > 0) {
                array.push({ name: name, count: parseInt(count) });
            }
        });
        array = _.sortBy(array, 'count').reverse();
        displayResults(".kaikar", array);
    });
});

function displayResults(container, array) {
    var total = parseInt($('.total-count').val()) || 100;
    _.each(array, function (element) {
        var percentage = ((parseInt(element.count) / total) * 100).toFixed(2);
        var data = `<div class="result-panel">
                        <label>${element.name}</label>
                        <progress value="${element.count}" max="${total}"></progress>
                        <div class="person-count">
                            <span>${element.count}/${total} (${percentage}%)</span>
                        </div>
                    </div>`;
        $(container).append(data);
    });
}
