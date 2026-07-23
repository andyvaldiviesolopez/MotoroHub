const emailLayout = ({
    title,
    subtitle,
    body,
    buttonText,
    buttonUrl,
}) => {

    return `
<!DOCTYPE html>

<html lang="it">

<head>

<meta charset="UTF-8">

<title>MotoroHub</title>

</head>

<body style="
    margin:0;
    padding:40px 20px;
    background:#f5f5f5;
    font-family:Arial, Helvetica, sans-serif;
">

<table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="border-collapse:collapse;"
>

<tr>

<td align="center">

<table
    width="600"
    cellpadding="0"
    cellspacing="0"
    style="
        background:#ffffff;
        border-radius:20px;
        overflow:hidden;
        box-shadow:0 10px 30px rgba(0,0,0,.08);
    "
>

<!-- HEADER -->

<tr>

<td
    align="center"
    style="
        padding:40px 30px;
        border-bottom:1px solid #ececec;
    "
>

<h1
    style="
        margin:0;
        font-size:40px;
        color:#212529;
        font-weight:800;
    "
>

Motoro<span style="color:#dc3545;">Hub</span>

</h1>

<p
    style="
        margin-top:10px;
        margin-bottom:0;
        color:#6c757d;
        font-size:15px;
    "
>

La community dedicata ai motociclisti.

</p>

</td>

</tr>

<!-- BODY -->

<tr>

<td
    style="
        padding:45px;
    "
>

<h2
    style="
        margin-top:0;
        margin-bottom:10px;
        color:#212529;
        font-size:30px;
    "
>

${title}

</h2>

<p
    style="
        margin-top:0;
        color:#6c757d;
        line-height:1.7;
        font-size:16px;
    "
>

${subtitle}

</p>

<div
    style="
        margin:35px 0;
        color:#495057;
        line-height:1.8;
        font-size:16px;
    "
>

${body}

</div>

${buttonText && buttonUrl
            ?

            `
<div style="text-align:center; margin:40px 0;">

<a
    href="${buttonUrl}"
    style="
        background:#dc3545;
        color:white;
        text-decoration:none;
        padding:15px 35px;
        border-radius:12px;
        font-weight:bold;
        display:inline-block;
        font-size:16px;
    "
>

${buttonText}

</a>

</div>
`

            :

            ""

        }

${buttonUrl
            ?

            `
<p
    style="
        color:#6c757d;
        font-size:14px;
        margin-top:40px;
        line-height:1.7;
    "
>

Se il pulsante non funziona copia e incolla questo link nel browser:

<br><br>

<a
    href="${buttonUrl}"
    style="
        color:#dc3545;
        word-break:break-word;
    "
>

${buttonUrl}

</a>

</p>
`

            :

            ""

        }

${buttonUrl || ""}

</a>

</p>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
    align="center"
    style="
        background:#212529;
        color:white;
        padding:30px;
    "
>

<p
    style="
        margin:0;
        font-size:14px;
    "
>

© 2026 <strong>MotoroHub</strong>

</p>

<p
    style="
        margin-top:10px;
        color:#adb5bd;
        font-size:13px;
    "
>

Ride • Share • Discover

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;

};

module.exports = emailLayout;