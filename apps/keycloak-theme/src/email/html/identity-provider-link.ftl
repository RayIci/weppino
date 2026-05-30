<#import "template.ftl" as layout>
<@layout.emailLayout>
  <@layout.heading>Link your ${identityProviderDisplayName} account</@layout.heading>
  <@layout.text>
    Hi<#if user.firstName??> ${user.firstName}</#if>, someone tried to sign in to your ${realmName} account using ${identityProviderDisplayName}.
    To link your accounts, click the button below.
  </@layout.text>
  <@layout.ctaButton href="${link}">Link account</@layout.ctaButton>
  <@layout.muted>This link expires in ${linkExpirationFormatter(linkExpiration)}.</@layout.muted>
  <@layout.muted>If you did not make this request, you can safely ignore this email.</@layout.muted>
</@layout.emailLayout>
