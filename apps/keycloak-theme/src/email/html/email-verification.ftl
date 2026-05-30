<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Verify your email address</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, thanks for signing up to ${realmName}.
    Please verify your email address by clicking the button below.
  </@layout.text>
  <@layout.ctaButton href="${link}">Verify email address</@layout.ctaButton>
  <@layout.muted>This link expires in ${linkExpirationFormatter(linkExpiration)}.</@layout.muted>
  <@layout.muted>If you did not create an account, you can safely ignore this email.</@layout.muted>
</@layout.emailLayout>
