var number_of_accounts = 10;
var i;
for (i = 0; i < number_of_accounts; i++) {
  // var secret_seed_1 = lightwallet.keystore.generateRandomSeed();

  // var mnemonic = bip39.generateMnemonic()
  // var seed = bip39.mnemonicToSeed(mnemonic)
  // var hdwallet = hdkey.fromMasterSeed(seed)
  var mnemonic = new Mnemonic("english");
  var secret_words = mnemonic.generate();
  var passphrase = "verysecret";
  var secret_seed = mnemonic.toSeed(secret_words, passphrase);
  var hdwallet = ethereumjs.WalletHD.fromMasterSeed(secret_seed);
  // var account = ethereumjs.WalletHD.fromMasterSeed(secret_seed).getWallet();
  var path = "m/44'/60'/0'/0" // Jaxx and Metamask derivation Path
  var node = hdwallet.derivePath(path);
  var account = node.getWallet();
  var private_key = account.getPrivateKey().toString('hex');
  // var public_key = account.getPublicKeyString();
  // var public_address = account.getAddressString();
  var checksum_address = account.getChecksumAddressString();
  // var json_wallet = account.toV3("secret");
  // $('#private_key_words').html(secret_words_1);
  $("#accounts")
    .find('tbody')
    .append('<tr><td><span id="public_address_string_' + i
            + '">En cours de calcul...</span><br /><span id="public_address_qr_code_' + i
            + '"></span></td>'
            + '<td><span id="account_index">' + i
            + '</span></td>'
            + '<td><span id="private_key_string_' + i
            + '">En cours de calcul...</span><br /><span id="private_key_qr_code_' + i
            + '"></span></td></tr>');
  $('#public_address_string_'+i).html(checksum_address);
  $('#private_key_string_'+i).html(private_key);
} 

var i;
var zip = new JSZip();

$(document).ready(function () {
  for (i = 0; i < number_of_accounts; i++) {
    var qr_name = "public_address_qr_code_"+i;
    var public_address_qrcode = $("#qr_name").qrcode({ 
      // render method: 'canvas', 'image' or 'div'
      render: 'canvas',
      // version range somewhere in 1 .. 40
      minVersion: 1,
      maxVersion: 40,
      // error correction level: 'L', 'M', 'Q' or 'H'
      ecLevel: 'H',
      // offset in pixel if drawn onto existing canvas
      left: 0,
      top: 0,
      // size in pixel
      size: 200,
      // code color or image element
      fill: '#000',
      // background color or image element, null for transparent background
      background: null,
      // content
      text: checksum_address,
      // corner radius relative to module width: 0.0 .. 0.5
      radius: 0,
      // quiet zone in modules
      quiet: 0,
      // modes
      // 0: normal
      // 1: label strip
      // 2: label box
      // 3: image strip
      // 4: image box
      mode: 2,
      mSize: 0.1,
      mPosX: 0.5,
      mPosY: 0.5,
      label: 'no label',
      fontname: 'sans',
      fontcolor: '#000',
      image: null
    });
    // console.log("new");
    // console.log("qrname : ", qr_name);
    // console.log("public_address_qrcode : ", public_address_qrcode);
    // console.log("its _el.lastChild : ", public_address_qrcode._el.lastChild);
    // var src = public_address_qrcode._el.lastChild.src;
    // console.log("src : ", src);
    // var baseImg = src.split("base64,")[1];
    // console.log(baseImg);
    console.log("public_address_qrcode : ", public_address_qrcode);
    
    /*
    var qr_name = "private_key_qr_code_"+i;
    var private_key_qrcode = new QRCode(document.getElementById(qr_name), {
  	  text: private_key,
  	  width: 256,
  	  height: 256,
  	  colorDark : "#000000",
  	  colorLight : "#ffffff",
  	  correctLevel : QRCode.CorrectLevel.H
    });
    var baseImg = private_key_qrcode._el.lastChild.src.split("base64,")[1];
    zip.file(qr_name + '.png', baseImg, {base64: true}); */
  };
});

$(document).ready(function () {
  for (i = 0; i < number_of_accounts; i++) {
    var qr_name = "public_address_qr_code_"+i;
    zip.file(qr_name + '.png', $("#" + qr_name)); //, {base64: true});
  };

  zip.generateAsync({type:"blob"})
  .then(function(content) {
    saveAs(content, "example.zip");
  });
});


