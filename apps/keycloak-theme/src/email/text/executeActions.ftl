Action required — ${realmName}

Hi<#if user.firstName??> ${user.firstName}</#if>,

Please complete the following action(s) for your account:

<#list requiredActions as action>- ${msg("requiredAction.${action}")}
</#list>

Complete your action here:
${link}

This link expires in ${linkExpirationFormatter(linkExpiration)}.
