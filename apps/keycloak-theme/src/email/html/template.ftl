<#macro emailLayout>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${realmName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background-color:#f5f5f2;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;width:100%;">

          <!-- Header / Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <span style="font-size:28px;font-weight:400;letter-spacing:2px;font-family:Georgia,'Times New Roman',serif;">
                <span style="color:#2C2C2C;">Wep</span><span style="color:#6B8F5E;">pino</span>
              </span>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background-color:#ffffff;border:1px solid #e8e8e4;border-radius:12px;padding:40px 48px;">
              <#nested />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:24px;">
              <p style="margin:0;font-size:12px;color:#9a9a92;line-height:1.6;">
                ${realmName} &middot; This email was sent automatically. Please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
</#macro>

<#-- Reusable CTA button -->
<#macro ctaButton href>
  <table cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
    <tr>
      <td style="background-color:#6B8F5E;border-radius:6px;">
        <a href="${href}" target="_blank"
           style="display:inline-block;padding:12px 28px;color:#ffffff;font-size:14px;font-weight:600;
                  text-decoration:none;letter-spacing:0.3px;">
          <#nested />
        </a>
      </td>
    </tr>
  </table>
</#macro>

<#-- Section heading -->
<#macro heading>
  <h1 style="margin:0 0 16px 0;font-size:22px;font-weight:400;color:#2C2C2C;
             font-family:Georgia,'Times New Roman',serif;line-height:1.3;">
    <#nested />
  </h1>
</#macro>

<#-- Body text -->
<#macro text>
  <p style="margin:0 0 16px 0;font-size:15px;color:#4a4a44;line-height:1.7;">
    <#nested />
  </p>
</#macro>

<#-- Muted small text -->
<#macro muted>
  <p style="margin:0 0 8px 0;font-size:13px;color:#9a9a92;line-height:1.6;">
    <#nested />
  </p>
</#macro>
