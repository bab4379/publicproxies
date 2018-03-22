<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:enr="http://www.seic.com/enrollment"
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
<xsl:strip-space elements="*"/>
<xsl:param name="sm_universalid" select="''"/>
<xsl:template match="@*|node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>
<xsl:template match="enr:userId"/>
<xsl:template match="enr:version"/>
<xsl:template match="soapenv:Header">
    <xsl:copy>
        <enr:userId><xsl:value-of select="$sm_universalid"/></enr:userId>
        <enr:version><xsl:value-of select="1"/></enr:version>        
    </xsl:copy>
</xsl:template>
</xsl:stylesheet>