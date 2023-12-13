import { Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import TeamListModal from "./TeamListModal";

function TeamList({roles, setRoles, users}) {
    const rows= roles ? roles.map(role => {
        return ({
            id: role.id,
            role: role.name,
            user_name: role.user.name,
            user_id: role.user_id,
        })
    }) : [];

    console.log(roles)

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Role</TableCell>
                            <TableCell>Team Member</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component='th' scope='row'>
                                    {row.role}
                                </TableCell>
                                <TableCell>{row.user_name}</TableCell>
                                <TableCell>
                                    <span>
                                        <TeamListModal row={row} roles={roles} setRoles={setRoles} users={users}/>
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default TeamList