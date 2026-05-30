<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Your password was changed</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, your ${realmName} account password was successfully updated.
  </@layout.text>
  <@layout.muted>If you did not make this change, please contact support immediately.</@layout.muted>
</@layout.emailLayout>
