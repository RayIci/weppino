Reset your password — ${realmName}

Hi<#if user.firstName??> ${user.firstName}</#if>,

To reset your password, visit the link below:

${link}

This link expires in ${linkExpirationFormatter(linkExpiration)}.

If you did not request a password reset, you can safely ignore this email.
