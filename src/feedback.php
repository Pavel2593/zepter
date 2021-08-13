<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['feedbackName'])) {
        $name = $_POST['feedbackName'];
    }

    if (isset($_POST['feedbackSurname'])) {
        $surname = $_POST['feedbackSurname'];
    }

    if (isset($_POST['feedbackMiddleName'])) {
        $middleName = $_POST['feedbackMiddleName'];
    }

    if (isset($_POST['feedbackCity'])) {
        $city = $_POST['feedbackCity'];
    }

    if (isset($_POST['feedbackPhoneNumber'])) {
        $phoneNumber = substr_replace($_POST['feedbackPhoneNumber'], '+7', 0, 1);
    }

    if (isset($_POST['feedbackEmail'])) {
        $email = $_POST['feedbackEmail'];
    }
}


// обращаемся к Битрикс24 при помощи функции curl_exec
function sendDataBitrix($queryUrl, $queryData) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_POST => 1,
        CURLOPT_HEADER => 0,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_URL => $queryUrl,
        CURLOPT_POSTFIELDS => $queryData,
    ));
    $res = curl_exec($curl);
    curl_close($curl);
    $res = json_decode($res, 1);

    return $res;
}

$queryAddContactUrl = 'https://crm.zepter.com/rest/22997/1qxz2sdxb4vdh3bu/crm.contact.add';
$queryAddContactData = http_build_query(array(
    'fields' => array(
        "NAME" => $name,
        "LAST_NAME" => $surname,
        "SECOND_NAME" => $middleName,
        "UF_ADDRESS_CITY" => $city,
        "EMAIL" => array(
            array(
                "VALUE" => $email,
                "VALUE_TYPE" => "WORK"
            )
        ),
        "PHONE" => array(
            array(
                "VALUE" => $phoneNumber,
                "VALUE_TYPE" => "WORK"
            )
        ),
    ),
    'params' => array("REGISTER_SONET_EVENT" => "Y")
));

$queryGetIdContactUrl = 'https://crm.zepter.com/rest/22997/1qxz2sdxb4vdh3bu/crm.contact.list';
$queryGetIdContactData = http_build_query(array(
    'filter' => array(
        "PHONE" => $phoneNumber,
    ),
    'select' => array("ID")
));

$contactIdRes = sendDataBitrix($queryGetIdContactUrl, $queryGetIdContactData);
$contactId = $contactIdRes['result'];

if ($contactId) {
    $contactId = $contactId[0]['ID'];
} else {
    $contactIdRes = sendDataBitrix($queryAddContactUrl, $queryAddContactData);
    $contactId = $contactIdRes['result'];
}


$queryAddDealUrl = 'https://crm.zepter.com/rest/22997/1qxz2sdxb4vdh3bu/crm.deal.add';
$queryAddDealData = http_build_query(array(
    'fields' => array(
        "TITLE" => $surname.' '.$name.' '.$middleName,
        "CONTACT_ID" => $contactId,
        "CATEGORY_ID" => 9,
    ),
    'params' => array("REGISTER_SONET_EVENT" => "Y")
));

$resultAddDeal = sendDataBitrix($queryAddDealUrl, $queryAddDealData);


if (array_key_exists('error', $resultAddDeal)) {
    $data = array(
        "code" => "500",
        "message" => "Из-за технических работ, форма не работает."
    );
    echo json_encode($data);
} else {
    $data = array(
        "code" => "200",
        "message" => "Форма отправлена"
    );
    echo json_encode($data);
}
?>