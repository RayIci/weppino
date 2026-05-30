<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Action required for your account</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, you need to complete the following action(s) for your ${realmName} account:
  </@layout.text>
  <ul style="margin:0 0 20px 0;padding-left:20px;color:#4a4a44;font-size:15px;line-height:1.8;">
    <#list requiredActions as action>
      <li>${msg("requiredAction.${action}")}</li>
    </#list>
  </ul>
  <@layout.ctaButton href="${link}">Complete action</@layout.ctaButton>
  <@layout.muted>This link expires in ${linkExpirationFormatter(linkExpiration)}.</@layout.muted>
</@layout.emailLayout>
