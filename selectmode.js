var checked1 = []
var checked2 = []
var checked3 = []
var checked4 = []
var rgbCol1 = ""
var rgbCol2 = ""
var rgbCol3 = ""
var rgbCol4 = ""
var rgbName1 = ""
var rgbName2 = ""
var rgbName3 = ""
var rgbName4 = ""
var splice1 = []
var splice2 = []
var splice3 = []
var splice4 = []

var contentArr = []
var fname = ""
var content = ""

var s1Percents = []
var s1Coords = []
var s2Percents = []
var s2Coords = []
var s3Percents = []
var s3Coords = []
var s4Percents = []
var s4Coords = []
var s1 = ""
var s2 = ""
var s3 = ""
var s4 = ""
var rgb1;
var rgb2
var rgb3;
var rgb4;

$(document).ready(function() {

  document.getElementById('input-file')
  .addEventListener('change', getFile)

  //currently user can upload a .txt file with arrays of x-coords and percentages
  //eventually the "Upload File" button should be for uploading the actual .svg file and the .txt file will be returned from python code
  function getFile(event) {
  	const input = event.target
    if ('files' in input && input.files.length > 0) {
      var filename = input.files[0].name;
      fname = filename.split(".")[0];
  	  readFileContent(input.files[0], parseText());
    }
  }

  function readFileContent(file, callback) {
  	const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.addEventListener("loadend", function() {
        content = reader.result;
      })
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })
    callback(); //supposed to call parseText after this function says callback but doesn't seem to work ?? so I added a setTimeout anyways
  }

  function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

//refresh page for next .hpx  input
$('#reload-button').click(function() {
    location.reload();
});

  function parseText() {
    setTimeout( function() {
      //split the file by new line into separate strings, since new line separates each coloured path
      var arr = content.split('\n');
      var counter = 0;
      //console.log(arr);
      rgbCol1 = "rgb" + arr[2];
      s1 = arr[3];
      if (arr.length >= 7)
      {
        rgbCol2 = "rgb" + arr[5];
        s2 = arr[6];
      }
      if (arr.length >= 10)
      {
        rgbCol3 = "rgb" + arr[8];
        s3 = arr[9];
      }
      if (arr.length >= 13)
      {
        rgbCol4 = "rgb" + arr[11];
        s4 = arr[12];
      }

      rgbName1 = color.toName(rgbCol1);
      rgbName2 = color.toName(rgbCol2);
      rgbName3 = color.toName(rgbCol3);
      rgbName4 = color.toName(rgbCol4);

      $("#color1").text(rgbName1); //set the dropdown list with all the available color names
      $("#color2").text(rgbName2);
      $("#color3").text(rgbName3);
      $("#color4").text(rgbName4);

      //parse all percentages into one object and all the coordinates into another
      const s1Arr = JSON.parse(s1);
      s1Percents = s1Arr.map(([, percentage]) => percentage);
      s1Coords = s1Arr.map(([coords ,]) => coords);

      const s2Arr = JSON.parse(s2);
      s2Percents = s2Arr.map(([, percentage]) => percentage);
      s2Coords = s2Arr.map(([coords ,]) => coords);

      if (s3)
      {
        const s3Arr = JSON.parse(s3);
        s3Percents = s3Arr.map(([, percentage]) => percentage);
        s3Coords = s3Arr.map(([coords ,]) => coords);
      }

      if (s4)
      {
        const s4Arr = JSON.parse(s4);
        s4Percents = s4Arr.map(([, percentage]) => percentage);
        s4Coords = s4Arr.map(([coords ,]) => coords);
      }

    }, 1000 );
  }

  function readURL(input) {
    if (input.files && input.files[0])
    {
        var reader = new FileReader();

        reader.onload = function (e)
        {
            $('#svg-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
  }

  $("#img-file").change(function(){
    readURL(this);
  });

  $('.dropdown').click(function(){
    $('.dropdown-menu').toggleClass('show');
  });

  $('#color1').click(function(){
    checked1 = [];

    $("input:checkbox[name=check]:checked").each(function(){
        checked1.push($(this).val());
    });

    $('input[type=checkbox]').prop('checked',false); //reset all checkboxes
  });

  $('#color2').click(function(){
    checked2 = [];

    $("input:checkbox[name=check]:checked").each(function(){
        checked2.push($(this).val());
    });

    $('input[type=checkbox]').prop('checked',false); //reset all checkboxes
  });

  $('#color3').click(function(){
    checked3 = [];

    $("input:checkbox[name=check]:checked").each(function(){
        checked3.push($(this).val());
    });

    $('input[type=checkbox]').prop('checked',false); //reset all checkboxes
  });

  $('#color4').click(function(){
    checked4 = [];

    $("input:checkbox[name=check]:checked").each(function(){
        checked4.push($(this).val());
    });

    $('input[type=checkbox]').prop('checked',false); //reset all checkboxes
  });

  $('#play-button').click(function(){
    $(".selectionBox").remove(); //remove all the selection boxes currently on the page
    $(".col-md-1.col-2.nopadding").remove();
    $("#selectColor").remove(); //remove select colour button

    for (var i=0; i<checked1.length; i++)
    {
      var index = checked1[i];
      contentArr[index-1] = rgbCol1.substring(0, rgbCol1.length - 1);
    }
    for (var i=0; i<checked2.length; i++)
    {
      var index = checked2[i];
      contentArr[index-1] = rgbCol2.substring(0, rgbCol2.length - 1);
    }
    for (var i=0; i<checked3.length; i++)
    {
      var index = checked3[i];
      contentArr[index-1] = rgbCol3.substring(0, rgbCol3.length - 1);
    }
    for (var i=0; i<checked4.length; i++)
    {
      var index = checked4[i];
      contentArr[index-1] = rgbCol4.substring(0, rgbCol4.length - 1);
    }
    var arrStr = contentArr.toString();
    content = "[" + arrStr + "]" + "\n" + "\n" + content;
    //content = "red" + "\n" + "[" + checked1 + "]" + "\n" + "\n" + "black" + "\n" + "[" + checked2 + "]" + "\n" + "\n" +content;

    //replace them with 4 new boxes depending on selected colours
    for (var i=1; i<3; i++)
    {
      var newText = $('<div class="col-md-1 col-2 nopadding"><div id="boxborder' + i + '"></div></div>');

      for (var j=0; j<checked1.length; j++)
      {
        if (i == parseInt(checked1[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName1
          });
          $(newText).children().addClass("colourBox1");
        }
      }

      for (var j=0; j<checked2.length; j++)
      {
        if (i == parseInt(checked2[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName2
          });
          $(newText).children().addClass("colourBox2");
        }
      }
      for (var j=0; j<checked3.length; j++)
      {
        if (i == parseInt(checked3[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName3
          });
          $(newText).children().addClass("colourBox3");
        }
      }
      for (var j=0; j<checked4.length; j++)
      {
        if (i == parseInt(checked4[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName4
          });
          $(newText).children().addClass("colourBox4");
        }
      }

      if (i == 1)
        $(newText).insertAfter("#row1");
      else
      {
        $("#boxborder" + (i-1)).parent().after(newText);
      }
    }

    for (var i=3; i<5; i++)
    {
      var newText = $('<div class="col-md-1 col-2 nopadding"><div id="boxborder' + i + '"></div></div>');

      for (var j=0; j<checked1.length; j++)
      {
        if (i == parseInt(checked1[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName1
          });
          $(newText).children().addClass("colourBox1");
        }
      }

      for (var j=0; j<checked2.length; j++)
      {
        if (i == parseInt(checked2[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName2
          });
          $(newText).children().addClass("colourBox2");
        }
      }
      for (var j=0; j<checked3.length; j++)
      {
        if (i == parseInt(checked3[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName3
          });
          $(newText).children().addClass("colourBox3");
        }
      }
      for (var j=0; j<checked4.length; j++)
      {
        if (i == parseInt(checked4[j]))
        {
          $(newText).children().addClass("playBox");
          $(newText).children().css({
            "border-color": rgbName4
          });
          $(newText).children().addClass("colourBox4");
        }
      }

      if (i == 3)
        $(newText).insertAfter("#row2");
      else
      {
        $("#boxborder" + (i-1)).parent().after(newText);
      }
    }

    //timeout to wait for boxes to all addClass first before filling them in
    setTimeout( function() {
      getRGBVals();
    }, 2000 );

    function getRGBVals() {

      //another Timeout to ensure the file is parsed and all the percent and coord objects are filled
      //before trying to use them to display RGB colours
      setTimeout( function(){
        // var xRange = Object.keys(s2Coords).length - 1;
        // var lastX = s2Coords[Object.keys(s2Coords)[xRange]] + 1;
        // var redLast = Object.keys(s1Coords).length - 1;
        // var redLastX = s1Coords[Object.keys(s1Coords)[redLast]];

        var s1Len = Object.keys(s1Coords).length - 1;
        var s1LastX = parseInt(s1Coords[Object.keys(s1Coords)[s1Len]]);
        var s1FirstX = parseInt(s1Coords[Object.keys(s1Coords)[0]]);
        var s2Len = Object.keys(s2Coords).length - 1;
        var s2LastX = parseInt(s2Coords[Object.keys(s2Coords)[s2Len]]);
        var s2FirstX = parseInt(s1Coords[Object.keys(s2Coords)[0]]);
        if (s3)
        {
          var s3Len = Object.keys(s3Coords).length - 1;
          var s3LastX = parseInt(s3Coords[Object.keys(s3Coords)[s3Len]]);
          var s3FirstX = parseInt(s3Coords[Object.keys(s3Coords)[0]]);
          var lastX = Math.max(s1LastX, s2LastX, s3LastX);
          var firstX = Math.min(s1FirstX, s2FirstX, s3FirstX);
        }
        if (s4)
        {
          var s4Len = Object.keys(s4Coords).length - 1;
          var s4LastX = parseInt(s4Coords[Object.keys(s4Coords)[s4Len]]);
          var s4FirstX = parseInt(s4Coords[Object.keys(s4Coords)[0]]);
          var lastX = Math.max(s1LastX, s2LastX, s3LastX, s4LastX);
          var firstX = Math.min(s1FirstX, s2FirstX, s3FirstX, s4FirstX);
        }
        else
        {
          var lastX = Math.max(s1LastX, s2LastX);
          var firstX = Math.min(s1FirstX, s2FirstX);
        }

        var j = 0;
        var k = 0;
        var p = 0;
        var q = 0;
        var l = 0;
        var m = 0;
        var progress = 0;

        //for each x-coordinate in the range of x-coordinates
        for (var i=0; i<lastX; i++)
        {
            (function(i){
              //this Timeout is to create a time delay between each background-color change
              setTimeout(function(){

                //load progress bar based on percentage of x-coords visited
                progress = parseInt((i/(lastX - firstX)) * 100);
                $("#progressBar").css({
                    'width' : progress + '%',
                });

                //if first curve has this x-coordinate in its list of x-coords
                if (s1Coords[Object.keys(s1Coords)[j]] == i)
                {
                  //update background colour with its percent of 256
                  var rgbValue = s1Percents[Object.keys(s1Percents)[j]] * 256;
                  rgb1 = 'rgb(' + rgbValue + ',' + rgbValue + ',' + rgbValue + ')';

                  $(".colourBox1").css({
                      'background-color' : rgb1,
                    });

                  // //load progress bar based on percentage of x-coords visited
                  // if (firstX == s1FirstX)
                  // {
                  //   console.log("Hi");
                  //   progress = parseInt((j/((lastX - firstX) / 5)) * 100);
                  //   $("#progressBar").css({
                  //       'width' : progress + '%',
                  //   });
                  // }

                  j++;
                }

                //if second curve has this x-coordinate in its list of x-coords
                if (s2Coords[Object.keys(s2Coords)[k]] == i)
                {
                  //update background colour with its percent of 256
                  var rgbValue2 = s2Percents[Object.keys(s2Percents)[k]] * 256;
                  rgb2 = 'rgb(' + rgbValue2 + ',' + rgbValue2 + ',' + rgbValue2 + ')';

                  $(".colourBox2").css({
                      'background-color' : rgb2,
                    });

                  k++;
                }

                //if third curve has this x-coordinate in its list of x-coords
                if (s3Coords[Object.keys(s3Coords)[l]] == i)
                {
                  //update background colour with its percent of 256
                  var rgbValue3 = s3Percents[Object.keys(s3Percents)[l]] * 256;
                  rgb3 = 'rgb(' + rgbValue3 + ',' + rgbValue3 + ',' + rgbValue3 + ')';

                  $(".colourBox3").css({
                      'background-color' : rgb3,
                    });

                  l++;
                }

                //if fourth curve has this x-coordinate in its list of x-coords
                if (s4Coords[Object.keys(s4Coords)[m]] == i)
                {
                  //update background colour with its percent of 256
                  var rgbValue4 = s4Percents[Object.keys(s4Percents)[m]] * 256;
                  rgb4 = 'rgb(' + rgbValue4 + ',' + rgbValue4 + ',' + rgbValue4 + ')';

                  $(".colourBox4").css({
                      'background-color' : rgb4,
                    });

                  m++;
                }

              }, 15 * i); //delay between each colour change
            }(i));
        }

      }, 1000 );

    }

  });

  $('#download-button').click(function(){
    var name = fname + "-2.txt";
    download(name, content);
  });

})
