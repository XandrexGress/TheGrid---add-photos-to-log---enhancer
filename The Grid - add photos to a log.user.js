// ==UserScript==
// @name         The Grid : add photos to a log
// @namespace    https://the-grid.org/
// @version      2
// @description  change UI for this page
// @author       Telegram: @Xandrex / IGN: XandrexGress
// @include		https://the-grid.org/r/?page=uploadphoto&*
// @include		https://the-grid.org/r/?page=uploadphoto&id=2109896&feature=53722
// ==/UserScript==

(function() {


function xdx() {

    'use strict';

    const nodesSnapshot = document.evaluate(
          '//div[@role="main"]/div/div/a'
          , document
          , null
          , XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
          , null
    );
    const nbrAs = nodesSnapshot.snapshotLength;
    //console.log ('nbr:'+ nbrAs);

    if (0!=nbrAs) {
        // create placeholder for new UI --------------------------------------
        let myA; // defined several times
        let myURL; // defined several times
        let myDIV; // defined several times

        const myCanvas = document.createElement('div');
            myCanvas.setAttribute('id','myPlaceholder');
            //myCanvas.setAttribute('style','border:solid cyan 1px;');

        const myForm = document.getElementsByTagName('form')[0];
            myForm.parentNode.insertBefore(myCanvas,myForm.nextSibling);

        // add link to view log as a user -------------------------------------
        myA = document.createElement('a');
            myURL = '' + document.location;
            //myURL = 'https://the-grid.org/r/?page=uploadphoto&id=2083367'; // debug
            console.log ('toto:' + myURL);
            myURL = myURL.replace('=uploadphoto&id=','=log&logid=');
            myA.href=myURL;
            // location.href='/r/?page=log&amp;logid=2083367';
            // https://the-grid.org/r/?page=log&logid=2083367
            myA.setAttribute('style','color:rgb(51,122,183);');
            myA.appendChild(document.createTextNode('Go back to log entry'));
        myCanvas.appendChild(myA);

        // section title ------------------------------------------------------
        myDIV = document.createElement('div');
            myDIV.setAttribute(
                  'style'
                , 'font-size: 23px;'
                 +'color: #fff;'
                 +'margin-bottom: 20px;'
                 +'font-weight: 100;'
                 +'margin-top:15px;'
            );
            myDIV.appendChild(document.createTextNode('Edit existing photos'));
        myCanvas.appendChild(myDIV);

        // display gallery of DIVs --------------------------------------------

        const myGallery = document.createElement('div');
            //myGallery.setAttribute('style','border:solid red 1px;');

        for ( let i=0 ; i < nbrAs ; i++ ) {
            const myArray = nodesSnapshot.snapshotItem(i).href.split('&');
                // [ "https://the-grid.org/r/?page=uploadphoto"  , "id=2083367"  , "unfeature=53145"]

            myDIV = document.createElement('div');
                myDIV.setAttribute(
                      'style'
                    , 'display:inline-block;'
                     +'vertical-align: top;'
                     +'text-align:center;'
                     +'margin-right: 10px;'
                );

            // thumbnail ------------------------
            let myAction;
            let myPictureId;
            [myAction, myPictureId] = myArray[2].split('=');

            const myIMG = document.createElement('img');
                myIMG.setAttribute(
                     'style'
                    ,(('unfeature'==myAction)?'border: 2px solid red;':'')+'max-width: 200px; max-height: 200px;'
                );
                    myURL = 'https://the-grid.org/r/userphotos/'+myPictureId+'-hd.jpg';
                    myIMG.setAttribute('src',myURL);

                myA= document.createElement('a');
                    myA.setAttribute('style','cursor:zoom-in;');
                    myA.setAttribute('target','_blank');
                    myA.href=myURL;
                    myA.appendChild(myIMG);

            myDIV.appendChild(myA);

            // feature / unfeature --------------
            myDIV.appendChild(document.createElement('br'));
            myDIV.appendChild(document.createElement('br'));
                myA= document.createElement('a');
                    myA.setAttribute(
                          'style'
                        , 'margin-left:  15px;'
                         +'margin-right: 15px;'
                         +'cursor:nesw-resize;'
                         +'color:rgb(51,122,183);'
                    );
                    myA.href = myArray.join('&');
                    myA.appendChild(document.createTextNode(myAction));
            myDIV.appendChild(myA);
                // https://the-grid.org/r/?page=uploadphoto&amp;id=2083367&amp;feature=53144
                // https://the-grid.org/r/?page=uploadphoto&amp;id=2083367&amp;unfeature=53145

            // remove link ----------------------
            myDIV.appendChild(document.createElement('br'));
            myDIV.appendChild(document.createElement('br'));
                myA = document.createElement('a');
                    myA.appendChild(document.createTextNode('remove picture'));
                    myA.setAttribute(
                          'style'
                        , 'cursor: crosshair;'
                         +'color:rgb(51,122,183);'
                    );
                        myArray[2] = 'removephoto'+'='+myPictureId;
                        myURL=myArray.join('&');
                    myA.setAttribute(
                         'onclick'
                        ,  "let agree=confirm('Are you sure you want to remove this photo from your post?'); if(agree) { location.href='"
                          +myURL
                          +"'; }"
                    );
            myDIV.appendChild(myA);

            myGallery.appendChild(myDIV);
        }
        // END FOR

        myCanvas.appendChild(myGallery);

        // delete original sections -------------------------------------------
        // (remove images / feature images / goto log button)
        let myNodeToDel; // defined several times
        while(myNodeToDel=myCanvas.nextSibling) {
            myNodeToDel.remove();
        }

    }
    // END IF (0!=nbrAs)

    return true;
}
// END function xdx()

xdx();

})();
