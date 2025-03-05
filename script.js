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
        "name": "A.C. Chummar",
        "index": "1",
        "count": "0"
    }, {
        "name": "C.K. Johnson",
        "index": "2",
        "count": "0"
    }, {
        "name": "Paul Mathews",
        "index": "3",
        "count": "0"
    }, {
        "name": "Thimothy Mampily",
        "index": "4",
        "count": "0"
    }, {
        "name": "Tony Pananchery",
        "index": "5",
        "count": "0"
    },
    {
        "name": "Invalid Votes",
        "index": "6",
        "count": "0"
    }
    ],
    "Parish": [{
        "name": "Abi Mathew",
        "index": "1",
        "count": "0"
    }, {
        "name": "Arooj Mohan",
        "index": "2",
        "count": "0"
    }, {
        "name": "A.R. Babu",
        "index": "3",
        "count": "0"
    }, {
        "name": "Biju Benjamin",
        "index": "4",
        "count": "0"
    }, {
        "name": "A.C. Chummar",
        "index": "5",
        "count": "0"
    }, {
        "name": "Davis Chandy",
        "index": "6",
        "count": "0"
    }, {
        "name": "C.V. Dinha",
        "index": "7",
        "count": "0"
    }, {
        "name": "Dolphy Paul",
        "index": "8",
        "count": "0"
    }, {
        "name": "O.T. Francis",
        "index": "9",
        "count": "0"
    }, {
        "name": "Gleeto Thimothy",
        "index": "10",
        "count": "0"
    }, {
        "name": "Jijo M.J.",
        "index": "11",
        "count": "0"
    }, {
        "name": "C.K. Johnson",
        "index": "12",
        "count": "0"
    }, {
        "name": "Laly Rapheal",
        "index": "13",
        "count": "0"
    }, {
        "name": "T.C. Paul",
        "index": "14",
        "count": "0"
    }, {
        "name": "E.P. Sabu",
        "index": "15",
        "count": "0"
    }, {
        "name": "Thimothy Mampily",
        "index": "16",
        "count": "0"
    }, {
        "name": "Tony Parakal",
        "index": "17",
        "count": "0"
    }, {
        "name": "N.R. Varghese",
        "index": "18",
        "count": "0"
    }, {
        "name": "O.L. Wilson",
        "index": "19",
        "count": "0"
    }, {
        "name": "Invalid Votes",
        "index": "20",
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
    $('.whatsapp-send').click(function () {
        if ($('.total-count').val() == "") {
            alert("Enter Total Polled Votes");
            return;
        }

        let message = "Election Results:\n";
        let totalVotes = $('.total-count').val();
        let results = [];

        $('.result-panel').each(function () {
            let name = $(this).find('label').text();
            let votes = $(this).find('progress').val();
            let percentage = $(this).find('.person-count span').text();
            results.push(`${name}: ${votes} votes (${percentage})`);
        });

        message += results.join("\n");
        message += `\nTotal Votes: ${totalVotes}`;

        let phoneNumber = "1234567890"; // Replace with recipient/group number
        let whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        window.open(whatsappURL, '_blank');
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
