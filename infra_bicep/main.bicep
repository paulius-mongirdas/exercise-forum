// The templates are generated by bicep IaC generator
targetScope = 'subscription'

param location string = 'eastus'
param resourceGroupName string = 'rg-myenv'
param resourceToken string = toLower(uniqueString(subscription().id, location, resourceGroupName))
param containerAppApp0Name string = 'app0${resourceToken}'
param openAIAi0Name string = 'ai0${resourceToken}'
param containerAppEnvName string = 'env${resourceToken}'
param containerRegistryName string = 'acr${resourceToken}'


// Deploy an Azure Resource Group

resource resourceGroup 'Microsoft.Resources/resourceGroups@2021-04-01' = {
	name: resourceGroupName
	location: location
}

// Deploy an Azure Container App environment

module containerAppEnv 'containerappenv.bicep' = {
	name: 'container-app-env-deployment'
	scope: resourceGroup
	params: {
		location: location
		name: containerAppEnvName
	}
}
var containerAppEnvId = containerAppEnv.outputs.id

// Deploy an Azure Container Registry

module containerRegistry 'containerregistry.bicep' = {
	name: 'container-registry-deployment'
	scope: resourceGroup
	params: {
		location: location
		name: containerRegistryName
	}
}

// Deploy an Azure Container App

module containerAppApp0Deployment 'containerapp.bicep' = {
	name: 'container-app-app0-deployment'
	scope: resourceGroup
	params: {
		location: location
		name: containerAppApp0Name
		targetPort: 80 
		containerAppEnvId: containerAppEnvId
		identityType: 'SystemAssigned'
		containerRegistryName: containerRegistryName  
	}
	dependsOn: [
		containerAppEnv
		containerRegistry
	]
}

// Deploy a Cognitive Service account of OpenAI kind

module openAIAi0Deployment 'openai.bicep' = {
	name: 'openai-ai0-deployment'
	scope: resourceGroup
	params: {
		location: location
		name: openAIAi0Name
		principalIds: [
			containerAppApp0Deployment.outputs.identityPrincipalId
		] 
		allowIps: union(containerAppApp0Deployment.outputs.outboundIps, [])
	}
	dependsOn: [
		containerAppApp0Deployment
	]
}

// Deploy an Azure Container App

module containerAppSettingsApp0Deployment 'containerapp.bicep' = {
	name: 'container-app-settings-app0-deployment'
	scope: resourceGroup
	params: {
		location: location
		name: containerAppApp0Name
		targetPort:  
		containerAppEnvId: containerAppEnvId
		identityType: 'SystemAssigned'
		containerRegistryName: containerRegistryName 
		containerEnv: [
			{
				name: 'AZURE_OPENAI_BASE'
				value: openAIAi0Deployment.outputs.endpoint
			}
			{
				name: 'AZURE_OPENAI_DEPLOYMENT'
				value: openAIAi0Deployment.outputs.deploymentName
			}
		] 
	}
	dependsOn: [
		openAIAi0Deployment
	]
}



output containerAppApp0Id string = containerAppApp0Deployment.outputs.id
output openAIAi0Id string = openAIAi0Deployment.outputs.id
output containerRegistryApp0Id string = containerRegistry.outputs.id
