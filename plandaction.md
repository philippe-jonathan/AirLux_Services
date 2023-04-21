# Projet final
### Setting up Crossplane

1.  Install kubectl command-line tool.

`sudo apt-get update && sudo apt-get install -y apt-transport-https curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list sudo apt-get update sudo apt-get install -y kubectl`

2.  Install Helm package manager.

`curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`

3.  Add the Crossplane Helm repository.


`helm repo add crossplane-stable https://charts.crossplane.io/stable helm repo update`

4.  Install Crossplane using Helm.

`kubectl create namespace crossplane-system helm install crossplane --namespace crossplane-system crossplane-stable/crossplane`

5.  Verify that Crossplane is running by checking the status of the Crossplane pods.

`kubectl get pods -n crossplane-system`

### Managing CRDs with Crossplane

1.  Create a CRD using a YAML manifest file. Here's an example:

`apiVersion: apiextensions.k8s.io/v1beta1 kind: CustomResourceDefinition metadata:   name: gameservers.example.com spec:   group: example.com   names:     kind: GameServer     plural: gameservers     singular: gameserver   scope: Namespaced   version: v1alpha1`

2.  Apply the manifest file to create the CRD.

`kubectl apply -f gameserver-crd.yaml`

3.  Verify that the CRD was created successfully.

`kubectl get crd`

### Creating and managing your own CRD

1.  Create a YAML manifest file that defines your own CRD.

`apiVersion: apiextensions.k8s.io/v1beta1 kind: CustomResourceDefinition metadata:   name: mygameservers.example.com spec:   group: example.com   names:     kind: MyGameServer     plural: mygameservers     singular: mygameserver   scope: Namespaced   version: v1alpha1`

2.  Apply the manifest file to create your own CRD.

`kubectl apply -f mygameserver-crd.yaml`

3.  Create an instance of your CRD using a YAML manifest file. Here's an example:

`apiVersion: example.com/v1alpha1 kind: MyGameServer metadata:   name: mygameserver-example spec:   game: "minecraft"   players: 10`

4.  Apply the manifest file to create the instance of your CRD.

`kubectl apply -f mygameserver-instance.yaml`

5.  Verify that the instance of your CRD was created successfully.

`kubectl get mygameservers`

These commands will help you set up Crossplane, manage CRDs with Crossplane, and create and manage your own CRDs. Good luck with your project!