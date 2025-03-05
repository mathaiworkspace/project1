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
    "kaikar": [...],  // Keep your JSON data
    "Parish": [...]
};

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
