    var timeout = 300;
    var npcInfo = [["Quartermaster Natomi","[&BN4HAAA=]"],
        ["Supplymaster Kani","[&BOAHAAA=]"],
        ["Quartermaster Vec","[&BAgIAAA=]"],
        ["Quartermaster Ival","[&BNUHAAA=]"],
        ["Steward Katren","[&BO8HAAA=]"],

        ["Supplymaster Azzi","[&BN0HAAA=]"],
        ["Scavenger Rakatin","[&BAYIAAA=]"],
        ["Forager Polly","[&BAIIAAA=]"],

        ["Supplier Huanya","[&BAwIAAA=]"],
        ["Jatt","[&BAMIAAA=]"],
        ["Supply Assistant","[&BMwHAAA=]"],
        ["Terrill Tinkerclaw","[&BAAIAAA=]"]];
    var itemIDiArray = [[46281,46186,46040,45622,45765,45731],
        [15465,14469,13924,10702,11876,11121],
        [15394,14517,13895,10722,11798,11295],
        [36779,36750,36813,36746,36891,36892],
        [15508,14596,13974,10710,11835,11248],

        [38336,38367,38415,38179,38264,38228],
        [15427,14648,13928,10699,11754,11167],
        [15352,14566,13895,10722,11798,11295],

        [15512,14516,13894,10707,11881,11126],
        [15423,14428,13973,10709,11834,11247],
        [15391,14563,13976,10691,11921,11341],
        [36779,36812,36780,36806,36842,36844]];
    $(function(){
        $('a').tooltip({trigger: 'click',animated: 'fade'});
        var flattenArray = [].concat.apply([], itemIDiArray).sort();
        var unduplicatedArray = Array.from(new Set(flattenArray));
        $.ajax({
            dataType: "json",
            url: "https://api.gw2tp.com/1/items?ids="+itemIDiArray.toString()+"&fields=name,sell,img",
            context: document.body
        }).done(function(data) {
            var itemData = data['results'];
            for(var i = 0;i < itemIDiArray.length;i++)
            {
                switch (i)
                {
                    case 0:
                        $("#notsure tr:last").after('<tr><td COLSPAN="5" tag="refreshHint"  class="mapName vb">Verdant Brink</td></tr>');
                        break;
                    case 5:
                        $("#notsure tr:last").after('<tr><td COLSPAN="5" tag="refreshHint"  class="mapName ab">Auric Basin</td></tr>');
                        break;
                    case 8:
                        $("#notsure tr:last").after('<tr><td COLSPAN="5" tag="refreshHint"  class="mapName td">Tangled Depths</td></tr>');
                        break;
                }
                var lowestItemPrice = 9999999;
                var lowestitemName = "";
                var itemImage = "";
                for(var j = 0;j < 6;j++)
                {
                    var singleItem = itemData[unduplicatedArray.indexOf(itemIDiArray[i][j])];
                    if (singleItem[2] < lowestItemPrice)
                    {
                        lowestItemPrice = singleItem[2];
                        lowestitemName = singleItem[1];
                        itemImage = singleItem[3];
                    }
                }
                var stringPrice = lowestItemPrice.toString();
                var coinedPrice = "";
                var sLength = stringPrice.length;
                if (sLength > 4)
                {
                    var gold = stringPrice.substr(0,sLength-4) + "<img src='assets/Gold_coin.png'> ";
                    coinedPrice += gold;
                }
                if (sLength > 2)
                {
                    var silver = stringPrice.substr(sLength-4,2) + "<img src='assets/Silver_coin.png'> ";
                    coinedPrice += silver;
                }
                var copper = stringPrice.substring(sLength-2,sLength) + "<img src='assets/Copper_coin.png'>";
                coinedPrice += copper;
                lowestitemName = "<a style='color:blue' onClick='copy(\"" + window.btoa(lowestitemName) + "\")' >" + lowestitemName + "</a>";
                $("#notsure tr:last").after('<tr><td class="checkBox"><input type="checkbox" id="checkbox'+i+'"></td><td>'+npcInfo[i][0]+'</td><td class="genwp">'+ "<a style='color:blue' class='comeToDaddy' title='copied!' onClick='copy(\"" + window.btoa(npcInfo[i][1]) + "\")' >" +npcInfo[i][1]+ "</a>" +'</td><td><img class="itemImg" class="comeToDaddy" title="copied!" src="'+itemImage+'"> '+lowestitemName+'</td><td style="text-align:right">'+coinedPrice+'</td></tr>');
            }
            $("#notsure tr:last").after('<tr><td><button data-clipboard-text="" onclick="Merge()">√</button></td> <td colspan="4">click this button to copy all Waypoints that you selected</td></tr>');
        });
        window.setInterval("refreshThisPage()",1000);
    });



    // function setTooltip(btn, message) {
    //   $(btn).tooltip('hide')
    //     .attr('data-original-title', message)
    //     .tooltip('show');
    // }
    //
    // function hideTooltip(btn) {
    //   setTimeout(function() {
    //     $(btn).tooltip('hide');
    //   }, 1000);
    // }

    // var clipboard = new clipboard('button');
    //
    // clipboard.on('success', function(e) {
    //   setTooltip(e.trigger, 'Copied!');
    //   hideTooltip(e.trigger);
    // });
    //
    // clipboard.on('error', function(e) {
    //   setTooltip(e.trigger, 'Failed!');
    //   hideTooltip(e.trigger);
    // });

    function refreshThisPage()
    {
        timeout--;
        $("#refreshHint").html("this page will be freshed after "+timeout+" sec to get current tp price");
        if(timeout==0)
        {
            window.location.reload();
        }
    }
    function copy(s) {
        $('body').append('<textarea id="clip_area"></textarea>')
        var clip_area = $('#clip_area');
        clip_area.text(window.atob(s));
        clip_area.select();
        document.execCommand('copy');
        clip_area.remove();
    }
    function Merge(){
        var txt="";
        for (var i=0; i<12; i++){
            if (document.getElementById("checkbox"+i).checked == true){
                txt += npcInfo[i][0]+" "+npcInfo[i][1]+" ";
            }
        }
        copy(btoa(txt));
    }
    //made by Leviathan.9385
    //Special thanks :
    //  My toxic teammates
    //  xMarch.8416
