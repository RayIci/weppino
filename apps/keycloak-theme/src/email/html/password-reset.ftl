<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Reset your password</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, we received a request to reset your password for your ${realmName} account.
  </@layout.text>
  <@layout.ctaButton href="${link}">Reset password</@layout.ctaButton>
  <@layout.muted>This link expires in ${linkExpirationFormatter(linkExpiration)}.</@layout.muted>
  <@layout.muted>If you did not request a password reset, you can safely ignore this email. Your password will not be changed.</@layout.muted>
</@layout.emailLayout>
