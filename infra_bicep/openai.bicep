param name string = 'openai${uniqueString(resourceGroup().id)}'
param location string = resourceGroup().location
param sku string = 'S0'
param allowIps array = []
param principalIds array = []
param roleDefinitionId string = 'a001fd3d-188f-4b5d-821b-7da978bf7442'  // Cognitive Services OpenAI Contributor
param keyVaultName string = ''
param secretName string = 'myvault/mysecret'

// Create a Cognitive Service account of the kind of OpenAI
resource cognitiveService 'Microsoft.CognitiveServices/accounts@2021-10-01' = {
	name: name
	location: location
	sku: {
		name: sku
	}
	kind: 'OpenAI'

	properties: {
		networkAcls: {
			defaultAction: 'Deny'
			ipRules: [
				for ip in allowIps: {
					value: ip
				}
			]
		}
		customSubDomainName: name
	}
}


// Create model deployment for OpenAI service
resource deployment 'Microsoft.CognitiveServices/accounts/deployments@2023-05-01' = {
	parent: cognitiveService
	name: 'gpt35turbo'
	properties: {
		model: {
			format: 'OpenAI'
			name: 'gpt-35-turbo'
			version: '0613'
		}
	}
	sku: {
		name: 'Standard'
		capacity: 20
	}
}


// create role assignments for the specified principalIds
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = [for (principalId, index) in principalIds: {
	scope: cognitiveService
	name: guid(cognitiveService.id, principalId, roleDefinitionId, string(index))
	properties: {
		roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
		principalId: principalId
		principalType: 'ServicePrincipal'
	}
}]

// create key vault and secret if keyVaultName is specified
resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = if (keyVaultName != ''){
	name: keyVaultName
}

resource keyVaultSecret 'Microsoft.KeyVault/vaults/secrets@2022-07-01' = if (keyVaultName != ''){
	name: secretName
	parent: keyVault
	properties: {
		attributes: {
			enabled: true
		}
		contentType: 'string'
		value: cognitiveService.listKeys().key1
	}
}


output id string = cognitiveService.id
output deploymentName string = deployment.name
output endpoint string = cognitiveService.properties.endpoint
output keyVaultSecretUri string = (keyVaultName != '' ? keyVaultSecret.properties.secretUriWithVersion : '')
