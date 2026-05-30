<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Unusual sign-in attempt</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, we noticed a failed sign-in attempt on your ${realmName} account.
  </@layout.text>
  <table cellpadding="0" cellspacing="0" role="presentation"
         style="width:100%;background:#f5f5f2;border-radius:8px;padding:16px 20px;margin-bottom:20px;">
    <tr><td style="font-size:13px;color:#9a9a92;padding-bottom:4px;">Time</td>
        <td style="font-size:14px;color:#2C2C2C;">${event.date?datetime?string["dd MMM yyyy HH:mm"]}</td></tr>
    <#if event.ipAddress??>
    <tr><td style="font-size:13px;color:#9a9a92;padding-bottom:4px;padding-top:8px;">IP address</td>
        <td style="font-size:14px;color:#2C2C2C;font-family:monospace;">${event.ipAddress}</td></tr>
    </#if>
  </table>
  <@layout.text>
    If this was you, no action is needed. If you don't recognise this activity, please reset your password immediately.
  </@layout.text>
</@layout.emailLayout>
