function createSheet(serviceItem) {
    return `
        <div class="tree-sheet">
            <span class="tree-sheet__text">${serviceItem['name']} ${serviceItem['price']}</span>
        </div>
    `
}

function createBranch(serviceItem) {
    const uniqueId = new Date().getTime() + getRandomInt(1, 10000);

    return `
        <div class="tree-branch">
            <div data-content="id${uniqueId}" class="tree-branch-head">
                <img class="tree-branch__icon" src="./arrow-down.png" alt="Стрелка вниз">
                <span class="tree-branch__text">${serviceItem['name']} ${serviceItem['price']}</span>
            </div>
            <div data-id="sId${serviceItem['id']}" id="id${uniqueId}" class="tree-branch-content">
            </div>
        </div>
    `
}

function generateThree(service) {
    const tree = document.querySelector(".tree")
    const res = service['node'] === 0 ? createSheet(service) : createBranch(service)

    if (service['head'] === null) {
        tree.innerHTML = tree.innerHTML + res
    } else {
        const threeContent = document.querySelector(`[data-id="sId${service['head']}"]`);
        threeContent.innerHTML = threeContent.innerHTML + res
    }

    for (const serviceItem of service['children']) {
        generateThree(serviceItem);
    }
}

function transformationServices(services) {

    for (let item of services) {
        const children = [];
        for (let cItem of services) {
            if (cItem['head'] == item['id']) {
                children.push(cItem);
            }
        }

        children.sort((s1, s2) => s1['sorthead'] - s2['sorthead'])
        item['children'] = children;
    }

    return services;
}

function getRootServices(services) {
    let rootServices = [];
    for (let item of services) {
        if (item['head'] === null) {
            rootServices.push(item)
        }
    }

    rootServices.sort((s1, s2) => s1['sorthead'] - s2['sorthead'])
    return rootServices
}