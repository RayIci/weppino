<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Two-factor authentication removed</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, two-factor authentication has been removed from your ${realmName} account.
  </@layout.text>
  <@layout.muted>If you did not make this change, please contact support immediately.</@layout.muted>
</@layout.emailLayout>
