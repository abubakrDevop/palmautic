import React, {Component} from 'react';

export class ContactEditor extends Component {

    constructor(props) {
        super(props);
        this.state = props
    }

    render() {

        if (this.props.contact.id) {
            this.state = this.props
        }

        return (
            <div className="bg-secondary shadow card">
                <div className="bg-white border-0 card-header">
                    <div className="align-items-center row">
                        <div className="col-8"><h3 className="mb-0">{this.state.contact.name || "Новый контакт"}</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form  className="">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    {/*<h6 className="heading-small text-muted mb-4">User information</h6>*/}
                                    <input id="input-name"
                                           placeholder="ФИО"
                                           type="text"
                                           style={{"marginBottom": "20px"}}
                                           className="form-control-alternative form-control"
                                           value={this.state.contact.name || ""}></input>
                                    <input id="input-email"
                                           placeholder="Email"
                                           style={{"marginBottom": "20px"}}
                                           type="email"
                                           className="form-control-alternative form-control"
                                           value={this.state.contact.email || ""}></input>
                                    <input id="input-phone"
                                           placeholder="Телефон"
                                           type="text"
                                           style={{"marginBottom": "20px"}}
                                           className="form-control-alternative form-control"
                                           value={this.state.contact.phone || ""}></input>
                                    <input id="input-company"
                                           placeholder="Компания"
                                           type="text" style={{"marginBottom": "20px"}}
                                           className="form-control-alternative form-control"
                                           value={this.state.contact.company || ""}></input>
                                    <input id="input-linkedin"
                                           placeholder="LinkedIn"
                                           style={{"marginBottom": "20px"}}
                                           type="text"
                                           className="form-control-alternative form-control"
                                           value={this.state.contact.linkedin || ""}></input>

                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={() => {
                                    this.setState((state, props) => {
                                        return {contact: {}};
                                    })
                                }} className="btn btn-primary">Новый
                                </button>

                                <button type="submit" onClick={() => {
                                    this.save()
                                }} className="btn btn-primary">Сохранить
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}