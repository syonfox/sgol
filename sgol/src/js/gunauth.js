class GunAuth {


    constructor(gun) {
        if (!gun) {
            gun = new Gun('https://bullchat.syon.ca/gun');
        }
        this.gun = gun;
        this.user = gun.user();


        this.msgLimit = 100;
        this.msgSize = 500;
        this.msgs = [];
    }


    isLoggedIn() {
        return !!this.user.is
    }

    promiseAuth() {

        return new Promise(resolve => {
            if (this.isLoggedIn()) {
                resolve(this.user);
            } else  {
                return this.login()
            }

        })

    }

    getPair() {

        return user
    }


    createUser(username) {

        let div = document.createElement('div');
        div.style.padding = '2em';

        div.innerHTML = `
        
        <label>Username:</label><input>
        <label>Password: </label><input type="password" >
        <label>Email: (optional) </label><input type="email">

        <button>Register</button>
        `;
        let modal = jsPanel.modal.create({
            headerTitle: 'Register User',
            content: div,
        });

        div.querySelector('button').addEventListener('click', e => {
            let inputs = div.querySelectorAll('input');
            let u = inputs[0].value;
            let p = inputs[1].value;
            let email = inputs[2].value;

            this.user.create(u, p, ack => {
                console.log(ack);
                if (ack.err) {
                    div.innerHTML += "<span style='background: #ff5b5b'>" + ack.err + '</span>';
                } else {
                    this.user.get('email').put(email);
                    modal.close();
                }
            })
        })

    }

    login(username) {

        return new Promise((resolve, reject) => {


            let div = document.createElement('div');
            div.style.padding = '2em';
            username = username || '';
            div.innerHTML = `
        <span></span>
        <div style="display: flex; align-items: center;">\
            <label>Username:</label>
            <input value="${username}"></div>
        <div style="display: flex; align-items: center;">
            <label>Password: </label>
            <input type="password" ></div>
        <button>Login</button>
        
        `;
            let modal = jsPanel.modal.create({
                headerTitle: 'Login Gun',
                content: div,

                onclosed: function(panel, closedByUser) {
                    console.log(`Panel with id: ${panel.id} closed!\nclosedByUser: ${closedByUser}`);
                    if(closedByUser) {
                        reject("Login Modal Closed By User!");
                    }
                }
            });

            let status = div.querySelector('span');
            div.querySelector('button').addEventListener('click', e => {
                let inputs = div.querySelectorAll('input');
                let u = inputs[0].value;
                let p = inputs[1].value;
                this.user.auth(u, p, ack => {
                    console.log(ack);
                    if (ack.err) {
                        status.innerText += ack.err;
                        status.style.ba
                    } else {
                        this.user.get('logins').set(Date.now());

                        resolve(this.user);
                        modal.close();

                    }
                });
                // module.onCl
            })
        });
    }

    logout() {
        this.user.leave();
    }

    public(key, val) {


    }

    getChat() {


        var match = {
            // lexical queries are kind of like a limited RegEx or Glob.
            '.': {
                // property selector
                '>': new Date(+new Date() - 1 * 1000 * 60 * 60 * 3).toISOString(), // find any indexed property larger ~3 hours ago
            },
            '-': 1, // filter in reverse
        };
        /*
                // Get Messages
                this.gun.get('chat')
                    .map(match)
                    .once(async (data, id) => {
                        if (data) {
                            // Key for end-to-end encryption
                            const key = '#foo';

                            var message = {
                                // transform the data
                                who: await db.user(data).get('alias'), // a user might lie who they are! So let the user system detect whose data it is.
                                what: (await SEA.decrypt(data.what, key)) + '', // force decrypt as text.
                                when: GUN.state.is(data, 'what'), // get the internal timestamp for the what property.
                            };

                            if (message.what) {
                                messages = [...messages.slice(-100), message].sort((a, b) => a.when - b.when);
                                if (canAutoScroll) {
                                    autoScroll();
                                } else {
                                    unreadMessages = true;
                                }
                            }
                        }
                    });*/
    }

}

// async function sendMessage() {
//     const secret = await SEA.encrypt(newMessage, '#foo');
//     const message = user.get('all').set({ what: secret });
//     const index = new Date().toISOString();
//     db.get('chat').get(index).put(message);
//     newMessage = '';
//     canAutoScroll = true;
//     autoScroll();
// }


var gunauth = new GunAuth();
