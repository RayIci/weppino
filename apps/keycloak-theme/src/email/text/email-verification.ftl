Verify your email address — ${realmName}

Hi<#if user.firstName??> ${user.firstName}</#if>,

Please verify your email address by visiting the link below:

${link}

This link expires in ${linkExpirationFormatter(linkExpiration)}.

If you did not create an account, you can safely ignore this email.
