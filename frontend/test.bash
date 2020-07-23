# For parsing json using cli
# sudo apt-get install jq

folder_name=$1

mkdir -p src/components/${folder_name}

# src/components/${folder_name}

touch src/components/${folder_name}/${folder_name}Add.js
touch src/components/${folder_name}/${folder_name}Delete.js
touch src/components/${folder_name}/${folder_name}Edit.js
touch src/components/${folder_name}/${folder_name}Update.js
touch src/components/${folder_name}/${folder_name}CommBox.js


cat > src/components/${folder_name}/${folder_name}Add.js << EOF
import React, { Component } from "react";

export default ${folder_name}Add extends Component {
render() {
return (
<div>Add</div>
)
}
}
EOF

cat > src/components/${folder_name}/${folder_name}Delete.js << EOF
import React, { Component } from "react";

export default ${folder_name}Add extends Component {
render() {
return (
<div>Add</div>
)
}
}
EOF

cat > src/components/${folder_name}/${folder_name}Edit.js << EOF
import React, { Component } from "react";

export default ${folder_name}Add extends Component {
render() {
return (
<div>Add</div>
)
}
}
EOF

cat > src/components/${folder_name}/${folder_name}Update.js << EOF
import React, { Component } from "react";

export default ${folder_name}Add extends Component {
render() {
return (
<div>Add</div>
)
}
}
EOF


cat > src/components/${folder_name}/${folder_name}CommBox.js << EOF
import React, { Component } from 'react';
import {
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    FormText,
    Label,
    Input
} from 'reactstrap';
import ReactPaginate from 'react-paginate';
import utility from '../../utils/utility';
import underscore from '../../utils/Underscore';
import httpRequest from '../../utils/httpRequest';
import Dashboard from './Dashboard';
import appConstants from '../../constants/appConstants';
import apiConstants from '../../constants/apiConstants';
 // Please import Actual Components over here
import {Folder_Name_Add} from './Folder_Name_Add';
const queryString = require('query-string');

class CommBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            smsSenderOption: null
        };
    }



    render() {

        const { environment, location } = this.props;
        const { pathname } = location;
       // Please change Route Name with actual One
        if (pathname == '/Folder_Name/Folder_Name_Add') {
            return (
                <Folder_Name_Add {...this.props} />
            );
        } else {
            return (
                <Dashboard {...this.props} />
            );
        }
    }
}

export default CommBox;
EOF






